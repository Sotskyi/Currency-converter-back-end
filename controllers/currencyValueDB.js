const dbSchema = require("../models/Rate.js");

// get all transactions
//@ route  GET /api/
// access Public
exports.getValue = async (req, res, next) => {

  try {
    const queryName =   req.query.currency;

    const findValue = await dbSchema.findOne().sort({ _id: -1 })
  
    const queryValue = await findValue.currencyValue[queryName];

    return res.status(201).json({
      
     currencyName: queryName,
     currencyValue:queryValue

    });
  } catch (error) {
    return res.status(400).json({
      succes: false,
      error: "Server Eroor"
    });


  }
};
exports.getValueForChart = async (req, res, next) => {
  try {

    // let past = new Date().setDate(new Date().getDate()-5)
    // let pastTOstring=new Date(past).toISOString()
    // today.setDate(today.getDate() -5);
    // let past=today.toISOString()
    console.log()
    const queryName =   req.query.chartdata;
    
    
    const findValue = await dbSchema.find({ 'chart': 1 }).sort({_id: -1}).limit(5);

    let withoutTODAY= findValue.filter((elem)=> {  if (new Date(elem.createdAt)
      .getDate()=== new Date().getDate())
      {  return false  } else return true }  )
    const result =   withoutTODAY.map((elem)=> elem.currencyValue[queryName] );
   
    
    return res.status(201).json({
      
     currencyName: queryName,
     currencyValue:result

    });
  } catch (error) {
    return res.status(400).json({
      succes: false,
      error: "Server Eroor"
    });


  }
};

// add transactions
//@ route  post /api/
// access Public
exports.addValue = async (req, res, next) => {
  try {
    const currentRate = await dbSchema.create(req.body);
    return res.status(201).json({
      succes: true,
      data: currentRate
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      succes: false,
      error: "Server Eroor"
    });
  }
};
