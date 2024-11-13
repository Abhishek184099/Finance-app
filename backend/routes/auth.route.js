const express = require("express");
const router = express.Router();
const {signup,login} = require("../controllers/user.controller")

router.post('/auth/signup',signup)
router.post('/auth/login',login)

module.exports = router;