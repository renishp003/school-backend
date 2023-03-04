const EnquireController = require('../controllers/EnquireController')
const express = require("express");
const router = express.Router();

router.post('/add' , (req,res) => EnquireController.enquire.add(req,res))
router.get('/getByBranch' , (req,res) => EnquireController.enquire.getByBranch(req,res))

module.exports = router;