const ADMIN = require('../modals/adminModal');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const PASSWORD = require('../modals/passwordModal');

exports.admin = {
    get : async (req,res) => {
        try {
            // var token = req.headers.authorization?.split(" ")[1];
            // jwt.verify(token, process.env.TOKEN_KEY, async function (err, decoded) {
              // if (err) {
              //   return res.status(401).json({
              //     message: "Auth token not found",
              //     error: err,
              //     isSuccess: false,
              //   });
              // } else {
                const admin = await ADMIN.find({});
                if(admin){
                    return res.status(200).json({
                      isSuccess : true,
                      message: "All admin data",
                      data : admin
                  });
                }
              // }
            // });
          } catch (error) {
            return res.json({isSuccess : false , message : 'Request Faild!'});
          }
    },
    add: async function (req, res) {
        try {
          let { email, branch, schoolId,  password, confirmPassword } = req.body;
          if (!( email && branch && schoolId && password && confirmPassword)) {
            return res.status(400).json({isSuccess : false , message:"All input is required"});
          }
    
          const adminInfo = await ADMIN.findOne({ email });
          if (adminInfo) {
            return res.status(400).json({isSuccess : false , message:"Email already exist!"});
          }
    
          if (password !== confirmPassword) {
            return res.status(400).json({isSuccess : false , message :"Password and Confirm Password must be same"});
          }
          bcrypt.hash(confirmPassword, 10).then(async (hash) => {
              password = hash;
              const admin = await ADMIN.create({ email, branch , schoolId });
              const passwordInfo = await PASSWORD.create({userId : admin._id , password : password})

              if(admin && passwordInfo){
                return res.status(200).json({
                  isSuccess : true,
                  message: "Admin created successfully",
                  data: admin,
                });
              }
              else{
                return res.status(200).json({
                  isSuccess : false,
                  message: "Admin not created!!"
                });
              }
            })
            .catch((err) => {
              return res.status(400).json(err);
            });
          
        } catch (error) {
          return res.json({isSuccess : false , message : 'Request Faild!'});
        }
      },

      login: async (req, res) => {
        try {
          let adminInfo = await ADMIN.findOne({
            email: req.body.email, _id: req.body.branchId , schoolId : req.body.schoolId
          });
          // if(adminInfo.schoolId !== req.body.schoolId){
            //   console.log(req.body)
            
            // }
          if (!adminInfo) {
            return res.json({
              isSuccess : false,
              message: "Email not found!",
            })
          }

          let passwordInfo = await PASSWORD.findOne({userId : req.body.branchId})
          if (!bcrypt.compareSync(req.body.password, passwordInfo.password)) {
            return  res.json({
              isSuccess : false,
              message: "Authentication failed. Wrong password.",
            })
          }  
          var token = jwt.sign({branchId : adminInfo._id , email: adminInfo.email , branchName : adminInfo.branch , schoolId : req.body.schoolId}, process.env.TOKEN_KEY, {
            expiresIn: "24h",
          });
          return res.json({
            isSuccess : true,
            message: "You are logged in successfully!",
            token : token
          });
        } catch (error) {
          return res.send('Somthing wrong!!');
        }
      },
      getOne: async (req,res) => {
        try{
          var token = req.headers.authorization?.split(" ")[1];
          if(!token){
            return res.status(400).json({message:"Token is required."});
          }
          jwt.verify(token, process.env.TOKEN_KEY, async function (err, decoded) {
            let userAdmin = await ADMIN.find({ _id : decoded.admin_id})
            return res.json({
              isSuccess : true,
              message: "Get successfull data of admin",
              data : userAdmin
            });
          })
        } catch(error){
          return res.json({isSuccess : false , message : 'Request Faild!'});
        }
      },

      checkAdminPassword : async (req,res) => {
        try{
          var token = req.headers.authorization?.split(" ")[1];
          if(!token){
            return res.status(400).json({message:"Token is required."});
          }
          jwt.verify(token, process.env.TOKEN_KEY, async function (err, decoded) {
            let userAdmin = await ADMIN.findOne({ _id : decoded.branchId})
            let userPassword = await PASSWORD.findOne({ userId : decoded.branchId})
            if (!userAdmin) {
              return res.json({
                isSuccess : false,
                message: "User not found!",
              })
            }
            if (!bcrypt.compareSync(req.body.password, userPassword.password)) {
              return  res.json({
                isSuccess : false,
                message: "Authentication failed. Wrong password.",
              })
            }
            return res.json({
              isSuccess : true,
              message: "Password is matched."
            });
          })
        } catch(error){
          return res.json({isSuccess : false , message : 'Request Faild!'});
        }
      },



}