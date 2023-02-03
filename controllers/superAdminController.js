const SUPERADMIN = require('../modals/superAdminModal');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.superAdmin = {
    get : async (req,res) => {
        try {
            const record = await SUPERADMIN.find({});
            return res.status(200).json({
                isSuccess : true,
                message: "All super admin data",
                data : record
            });
          } catch (error) {
            return res.json({isSuccess : false , message : 'Request Faild!'});
          }
    },
    add : async (req,res) => {
        try {
            let {email , password } = req.body;
            if(!(email && password)){
                return res.status(200).json({
                    isSuccess : false,
                    message: "All field requied!"
                });
            }
            bcrypt.hash(password, 10).then(async (hash) => {
                password = hash;
                const record = await SUPERADMIN.create({email , password});
                if(record){
                    return res.status(200).json({
                        isSuccess : true,
                        message: "Super admin added.",
                        data : record
                    });
                }
            })
          } catch (error) {
            return res.json({isSuccess : false , message : 'Request Faild!'});
          }
    },
    login : async (req,res) => {
        try {
            let {email , password} = req.body;
            if(!(email && password)){
                return res.status(200).json({
                    isSuccess : false,
                    message: "All field requied!"
                });
            }
            const record = await SUPERADMIN.findOne({email});
            if(!record){
                return res.status(200).json({
                    isSuccess : false,
                    message: "User not found!"
                });
            }
            if (!bcrypt.compareSync(password, record.password)) {
                return  res.json({
                isSuccess : false,
                message: "Authentication failed. Wrong password.",
                })
            } 
            return res.status(200).json({
                isSuccess : true,
                message: "Login successfull"
            });
          } catch (error) {
            return res.json({isSuccess : false , message : 'Request Faild!'});
          }
    },
}