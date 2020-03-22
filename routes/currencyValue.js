const express = require('express');
const router = express.Router();
const {getValue,addValue,getValueForChart} = require('../controllers/currencyValueDB');
router
.route("/")
.get(getValue)
.post(addValue)

router.route("/chart").get(getValueForChart)
module.exports = router;
