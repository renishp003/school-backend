const express = require("express");
const router = express.Router();

const adminRoute = require('./adminRoute');
const studentRoute = require('./studentRoute');
const schoolRoute = require('./schoolRoute');
const passwordRoute = require('./passwordRoute');
router.use('/admin' , adminRoute);
router.use('/student' , studentRoute);
router.use('/school' , schoolRoute);
router.use('/password' , passwordRoute);

module.exports = router;