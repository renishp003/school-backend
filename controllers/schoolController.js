const SCHOOL = require('../modals/schoolModal');
const STUDENT = require('../modals/studentModal');
const PASSWORD = require('../modals/passwordModal');
const ADMIN = require('../modals/adminModal');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.school = {
  get: async (req, res) => {
    try {
      const school = await SCHOOL.find({});
      if (school) {
        return res.status(200).json({
          isSuccess: true,
          message: "All school data",
          data: school
        });
      }
    } catch (error) {
      return res.json({ isSuccess: false, message: 'Request Faild!' });
    }
  },
  getById: async (req, res) => {
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
        else {
          const school = await SCHOOL.find({ _id: decoded.schoolId });
          if (school) {
            return res.status(200).json({
              isSuccess: true,
              message: "School find successfully",
              data: school
            });
          }
          else {
            return res.status(200).json({
              isSuccess: false,
              message: "School not found!!",
              data: school
            });
          }
        }
      })
    } catch (error) {
      return res.json({ isSuccess: false, message: 'Request Faild!' });
    }
  },
  add: async (req, res) => {
    try {

      let {email , schoolName , password , confirmPassword } = req.body;
      if (!(email ,schoolName && password && confirmPassword)) {
        return res.status(400).json({ isSuccess: false, message: "All field is required" });
      }

      const schoolInfo = await ADMIN.findOne({ email });
      if (schoolInfo) {
        return res.status(400).json({ isSuccess: false, message: "Email already exist!" });
      }

      if (password !== confirmPassword) {
        return res.status(400).json({ isSuccess: false, message: "Password and Confirm Password must be same" });
      }

      bcrypt.hash(confirmPassword, 10).then(async (hash) => {
        password = hash;
        const school = await SCHOOL.create({email , schoolName });
        const passwordInfo = await PASSWORD.create({ userId: school._id, password: password, userRoll: 'school' })
        return res.status(200).json({
          isSuccess: true,
          message: "School added successfully",
          data: school,
        });
      })
    } catch (error) {
      return res.json({ isSuccess: false, message: 'Request Faild!' });
    }
  },
  edit: async (req, res) => {
    try {
      const { schoolName } = req.body;
      if (!schoolName) {
        return res.status(400).json({ isSuccess: false, message: "School name is required" });
      }

      let school = await SCHOOL.findOneAndUpdate(
        { _id: req.query.id },
        {
          $set: {
            schoolName: schoolName,
          }
        })

      return res.status(200).json({
        isSuccess: true,
        message: "School name edited successfully",
        data: school,
      });

    } catch (error) {
      return res.json({ isSuccess: false, message: 'Request Faild!' });
    }
  },
  delete: async (req, res) => {
    try {
      if (!req.query.id) {
        return res.status(400).json({ isSuccess: false, message: "School id is required" });
      }

      let school = await SCHOOL.findByIdAndRemove({ _id: req.query.id })
      let adminsRecord = await ADMIN.find({ schoolId: req.query.id })
      adminsRecord.forEach(async (x) => {
        await PASSWORD.deleteOne({ userId: x._id })
      })
      let admin = await ADMIN.deleteMany({ schoolId: req.query.id })
      return res.status(200).json({
        isSuccess: true,
        message: "School and their branched are Deleted!!",
        data: school,
      });

    } catch (error) {
      return res.json({ isSuccess: false, message: 'Request Faild!' });
    }
  },
  login: async (req, res) => {
    try {
      let schoolInfo = await SCHOOL.findOne({email: req.body.email});

      if (!schoolInfo) {
        return res.json({
          isSuccess: false,
          message: "Email not found!",
        })
      }

      if (!bcrypt.compareSync(req.body.password, schoolInfo.password)) {
        return res.json({
          isSuccess: false,
          message: "Authentication failed. Wrong password.",
        })
      }

      var token = jwt.sign({ role : 'superAdmin' }, process.env.TOKEN_KEY, {
        expiresIn: "24h",
      });
      return res.json({
        isSuccess: true,
        message: "You are logged in successfully!",
        token : token
      });
    } catch (error) {
      return res.json({ isSuccess: false, message: 'Request Faild!' });
    }
  }
}