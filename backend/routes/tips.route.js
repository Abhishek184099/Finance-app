const express = require("express");
const router = express.Router();
const {getFinancialTips} = require("../controllers/tips.controller");
const {protectRoute} = require("../middleware/protectRoute");


router.get("/tips",protectRoute,getFinancialTips);

module.exports = router;