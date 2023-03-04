const schoolController = require('../controllers/schoolController')
const express = require("express");
const router = express.Router();

router.get('/get' , (req,res) => schoolController.school.get(req,res))
router.post('/add' , (req,res) => schoolController.school.add(req,res))
router.get('/getById' , (req,res) => schoolController.school.getById(req,res))
router.patch('/edit' , (req,res) => schoolController.school.edit(req,res))
router.delete('/delete' , (req,res) => schoolController.school.delete(req,res))
router.post('/login' , (req,res) => schoolController.school.login(req,res))

module.exports = router;