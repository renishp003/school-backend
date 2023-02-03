const passwordController = require('../controllers/passwordController')
const express = require("express");
const router = express.Router();

router.get('/get' , (req,res) => passwordController.password.get(req,res))

module.exports = router;