const express = require("express");
const router = express.Router();

const adminRoute = require('./adminRoute');
const studentRoute = require('./studentRoute');
const schoolRoute = require('./schoolRoute');
const passwordRoute = require('./passwordRoute');
const superAdminRoute = require('./superAdminRoute');
router.use('/admin' , adminRoute);
router.use('/student' , studentRoute);
router.use('/school' , schoolRoute);
router.use('/password' , passwordRoute);
router.use('/superAdmin' , superAdminRoute);

module.exports = router;