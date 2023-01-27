const SCHOOL = require('../modals/schoolModal');
const STUDENT = require('../modals/studentModal');
const ADMIN = require('../modals/adminModal');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.school = {
    get : async (req,res) => {
        try {
            const school = await SCHOOL.find({});
            if(school){
                return res.status(200).json({
                    isSuccess : true,
                    message: "All school data",
                    data : school
                });
            }
          } catch (error) {
            return res.json({isSuccess : false , message : 'Request Faild!'});
          }
    },
    getById : async (req,res) => {
        try {

            var token = req.headers.authorization?.split(" ")[1];
            jwt.verify(token, process.env.TOKEN_KEY, async function (err, decoded) {
              if (err) {
                return res.status(401).json({
                  message: "Auth token not found",
                  error: err,
                  isSuccess: false,
                });
              }
              else{
                  const school = await SCHOOL.find({_id:decoded.schoolId});
                  if(school){
                      return res.status(200).json({
                          isSuccess : true,
                          message: "School find successfully",
                          data : school
                      });
                  }
                  else{
                    return res.status(200).json({
                        isSuccess : false,
                        message: "School not found!!",
                        data : school
                    });
                  }
              }
            })
          } catch (error) {
            return res.json({isSuccess : false , message : 'Request Faild!'});
          }
    },
    add : async (req,res) => {
        try{

            const {schoolName} = req.body;
            if(!schoolName){
                return res.status(400).json({isSuccess : false , message:"School name is required"});
            }

            const school = await SCHOOL.create({ schoolName });

            return res.status(200).json({
              isSuccess : true,
              message: "School added successfully",
              data: school,
            });

        } catch (error){
            return res.json({isSuccess : false , message : 'Request Faild!'});
        }
    }
}