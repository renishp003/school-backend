const express = require("express");
const router = express.Router();

const adminRoute = require('./adminRoute');
const studentRoute = require('./studentRoute');
const schoolRoute = require('./schoolRoute');
router.use('/admin' , adminRoute);
router.use('/student' , studentRoute);
router.use('/school' , schoolRoute);

module.exports = router;