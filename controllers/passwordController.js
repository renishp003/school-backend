const PASSWORD = require('../modals/passwordModal');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.password = {
    get : async (req,res) => {
        try {
            const record = await PASSWORD.find({});
                return res.status(200).json({
                    isSuccess : true,
                    message: "All password data",
                    data : record
                });
          } catch (error) {
            return res.json({isSuccess : false , message : 'Request Faild!'});
          }
    },
}