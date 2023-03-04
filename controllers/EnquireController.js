const ADMIN = require('../modals/adminModal');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ENQUIRE = require('../modals/EnquireModal');

exports.enquire = {
    get: async (req, res) => {
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
            if (admin) {
                return res.status(200).json({
                    isSuccess: true,
                    message: "All admin data",
                    data: admin
                });
            }
            // }
            // });
        } catch (error) {
            return res.json({ isSuccess: false, message: 'Request Faild!' });
        }
    },
    getByBranch: async (req, res) => {
        try {
          var token = req.headers.authorization?.split(" ")[1];
          jwt.verify(token, process.env.TOKEN_KEY, async function (err, decoded) {
            if (err) {
              return res.status(401).json({
                message: "Auth token not found",
                error: err,
                isSuccess: false,
              });
            } else {
              console.log(decoded)
              const data = await ENQUIRE.find({ branchId: decoded.branchId });
              if (data) {
                return res.status(200).json({
                  isSuccess: true,
                  message: "All enquiries data",
                  data: data
                });
              }
            }
          });
        } catch (error) {
          return res.json({ data: error });
        }
      },
    add: async function (req, res) {
        try {
            let { email, branchId, name, parentsName, mobile } = req.body;
            if (!(email && branchId && name && parentsName && mobile)) {
                return res.status(400).json({ isSuccess: false, message: "All input is required" });
            }

            let enquire = await ENQUIRE.create({ email, branchId, name, parentsName, mobile });

            return res.status(200).json({
                isSuccess: true,
                message: "Your Details submited.",
                data: enquire
            });

        } catch (error) {
            return res.json({ isSuccess: false, message: 'Request Faild!' });
        }
    },


}