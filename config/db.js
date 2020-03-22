const mongoose= require("mongoose");


async   function connectDB(){
    try{
        await  mongoose.connect( process.env.MONGO_URI, {
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useCreateIndex:true})

        
        
    }
    catch(e){
        console.log('server Error',e.message)
        process.exit(1)
    }


}
module.exports = connectDB