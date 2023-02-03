const superAdminController = require('../controllers/superAdminController')
const express = require("express");
const router = express.Router();

router.get('/get' , (req,res) => superAdminController.superAdmin.get(req,res))
router.post('/add' , (req,res) => superAdminController.superAdmin.add(req,res))
router.post('/login' , (req,res) => superAdminController.superAdmin.login(req,res))

module.exports = router;