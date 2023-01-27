const adminController = require('../controllers/adminController')
const express = require("express");
const router = express.Router();

router.get('/get' , (req,res) => adminController.admin.get(req,res))
router.post('/add' , (req,res) => adminController.admin.add(req,res))
router.post('/login' , (req,res) => adminController.admin.login(req,res))
router.post('/getOne' , (req,res) => adminController.admin.getOne(req,res))
router.post('/checkAdminPassword' , (req,res) => adminController.admin.checkAdminPassword(req,res))

module.exports = router;