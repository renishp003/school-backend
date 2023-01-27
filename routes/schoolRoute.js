const schoolController = require('../controllers/schoolController')
const express = require("express");
const router = express.Router();

router.get('/get' , (req,res) => schoolController.school.get(req,res))
router.post('/add' , (req,res) => schoolController.school.add(req,res))
router.get('/getById' , (req,res) => schoolController.school.getById(req,res))

module.exports = router;