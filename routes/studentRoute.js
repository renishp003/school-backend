const studentController = require('../controllers/studentController');
const express = require("express");
const router = express.Router();

router.get('/getAll' , (req,res) => studentController.student.getAll(req,res))
router.get('/getbyToken' , (req,res) => studentController.student.getByToken(req,res))
router.post('/addMultiple' , (req,res) => studentController.student.addMultiple(req,res))
router.post('/addOne' , (req,res) => studentController.student.addOne(req,res))
router.post('/edit' , (req,res) => studentController.student.edit(req,res))
router.delete('/deleteOne' , (req,res) => studentController.student.deleteOne(req,res))
router.post('/deleteMany' , (req,res) => studentController.student.deleteMany(req,res))
router.get('/getById' , (req,res) => studentController.student.getById(req,res))
router.post('/login' , (req,res) => studentController.student.login(req,res))
router.get('/getLoginStudent' , (req,res) => studentController.student.getLoginStudent(req,res))

module.exports = router;