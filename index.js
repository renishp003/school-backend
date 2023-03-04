const express = require('express');
const app = express();
const port = 4000;
require('dotenv').config();
require('./config/db').connect();
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/index.js')
const jwt = require("jsonwebtoken");
const ADMIN = require('./modals/adminModal');
const STUDENT = require('./modals/studentModal');
const SCHOOL = require('./modals/schoolModal');
const PASSWORD = require('./modals/passwordModal');
const bcrypt = require("bcrypt");


app.use(cors())
app.use(
  express.json({
      limit: '1024mb',
  }),
)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/api', routes)

app.get('/api/verifyToken', async (req,res) => {
  try {
    var token = req.headers.authorization?.split(" ")[1];
    console.log(token)
    if(!token){
      return res.json({
        message: "Auth token is required!!",
        isSuccess: false,
      });
    }
    jwt.verify(token, process.env.TOKEN_KEY, async function (err, decoded) {
      if (err) {
        return res.json({
          message: "Auth token not verfied!!",
          error: err,
          isSuccess: false,
        });
      }
      else {
        console.log(decoded)
        return res.status(200).json({
          message: "Token verified",
          isSuccess: true,
          role : decoded.role
        });
      }
    })
  } catch (error) {
    return res.json({ isSuccess: false, message: 'Request Faild!' });
  }
})

app.post('/api/login', async (req,res) => {
  try {
    let { email } = req.body;
      if (!(email)) {
        return res.status(400).json({ isSuccess: false, message: "Email is required" });
      }
    let admin = await ADMIN.findOne({email});
    let student = await STUDENT.findOne({email});
    let school = await SCHOOL.findOne({email});

    let mainData;

    if(admin){
      mainData = admin
    }
    else if(student){
      mainData = student
    }
    else if (school){
      mainData = school
    }
    
    if(mainData == undefined){
      return res.json({ isSuccess: false, message: "User not registered!!" });
    }
    else{
      console.log('mainData' , mainData)
      let passwordInfo = await PASSWORD.findOne({ userId: mainData._id })
      if (!bcrypt.compareSync(req.body.password, passwordInfo.password)) {
        return res.json({
          isSuccess: false,
          message: "Authentication failed. Wrong password.",
        })
      }
      let token;
      if(admin)
      {
        token = jwt.sign({ branchId: mainData._id, email: mainData.email, branchName: mainData.branch , role : 'admin' }, process.env.TOKEN_KEY, {
          expiresIn: "24h",
        });
      }
      else if(student){
        token = jwt.sign({ studentId : student._id , role :'student' }, process.env.TOKEN_KEY, {
          expiresIn: "24h",
        });
      }
      else if(school)
      {
        token = jwt.sign({ role : 'superAdmin' }, process.env.TOKEN_KEY, {
          expiresIn: "24h",
        });
      }
      if(token){
        return res.json({
          isSuccess: true,
          message: "You are logged in successfully!",
          token: token
        });
      }
    }
  } catch (error) {
    return res.json({ isSuccess: false, message: 'Request Faild!' });
  }
})

app.listen(port , (req,res) => {
    console.log(`Server Start on http://localhost:${port}`)
})