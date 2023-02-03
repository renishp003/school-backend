const studentController = require('../controllers/studentController');
const express = require("express");
const router = express.Router();

router.get('/get' , (req,res) => studentController.student.get(req,res))
router.post('/addMultiple' , (req,res) => studentController.student.addMultiple(req,res))
router.post('/addOne' , (req,res) => studentController.student.addOne(req,res))
router.post('/edit' , (req,res) => studentController.student.edit(req,res))
router.delete('/deleteOne' , (req,res) => studentController.student.deleteOne(req,res))
router.post('/deleteMany' , (req,res) => studentController.student.deleteMany(req,res))
router.get('/getById' , (req,res) => studentController.student.getById(req,res))
// router.post('/login' , (req,res) => adminController.admin.login(req,res))

module.exports = router;