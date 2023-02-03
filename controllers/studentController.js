const STUDENT = require('../modals/studentModal');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const PASSWORD = require('../modals/passwordModal');

exports.student = {
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
                const student = await STUDENT.find({});
                if(student){
                    return res.status(200).json({
                      isSuccess : true,
                      message: "All student data",
                      data : student
                  });
                }
                else{
                  return res.status(200).json({
                    message: "student is not found!!"
                  });
                }
              // }
            // });
          } catch (error) {
            return res.json({data: error});
          }
    },
    addMultiple: async function (req, res) {
        try {
          var token = req.headers.authorization?.split(" ")[1];
          if(!token){
            return res.status(400).json({message:"Token is required."});
          }
          jwt.verify(token, process.env.TOKEN_KEY, async function (err, decoded) {
            let recordArray = []
            for(let i=0; i<req.body.recordNum; i++){

              let recordObj = { 
                surname: 'surname',
                name: 'Student'+ String(new Date().getMilliseconds()).slice(-4),
                fatherName :'fathername',
                mobile : String(new Date().getMilliseconds()).slice(-10),
                standard : '2',
                fees : 'false',
                batch : 'Morning',
                address : 'Address',
                birthDate: new Date(),
                admissionDate: new Date(),
                studentCurrentYear: new Date().getFullYear()+'-'+ String(new Date().getFullYear() +1).slice(-2),
                email: 'example' + (String(new Date().getDate()) + String(new Date().getMonth()+1) + String(new Date().getTime()).slice(-4)) + '@gmail.com',
                adminId : decoded.admin_id,
                division: 'A',
                grno : (String(new Date().getDate()) + String(new Date().getMonth()+1) + String(new Date().getTime()).slice(-4) + i)
              }

              // if (defaultPsw !== defaultPsw) {
                //   return res.status(400).json({message :"Password and Confirm Password must be same"});
                // }
                recordArray.push(recordObj)
              }
              const student = await STUDENT.insertMany(recordArray)
              
              let defaultPsw = 'Student@' +String(new Date().getMilliseconds()).slice(-4)
              
              student.map(async(x) => {
                let bcryptedpassword = await hashPassword(defaultPsw);
                await PASSWORD.create({userId : x._id , password : bcryptedpassword})
              })
            if(student){
              return res.status(200).json({
                isSuccess : true,
                message: "Student created successfully",
                data: student,
              });
            }
            else{
              return res.status(200).json({
                isSuccess : false,
                message: "Student not created",
              });
            }
          })  
        } catch (error) {
          return res.send(error);
        }
      },

      addOne: async function (req, res) {
        try {
          let { surname, name , fatherName, mobile, standard, fees, batch, address, birthDate, admissionDate, studentCurrentYear, email ,   division , password, confirmPassword , grno} = req.body;
          var token = req.headers.authorization?.split(" ")[1];
          if(!token){
            return res.status(400).json({isSuccess : false, message:"Token is required."});
          }
          if (!( surname && name  && fatherName && mobile && standard && fees && batch && address && birthDate && admissionDate && studentCurrentYear && email  && division && password && confirmPassword && grno)) {
            return res.status(400).json({isSuccess : false, message:"All input is required."});
          }
          if (password !== confirmPassword) {
            return res.status(400).json({isSuccess : false, message :"Password and Confirm Password must be same"});
          }
          jwt.verify(token, process.env.TOKEN_KEY, async function (err, decoded) {

              let recordObj = { 
                surname: surname,
                name: name,
                fatherName :fatherName,
                mobile : mobile,
                standard : standard,
                fees : fees,
                batch : batch,
                address : address,
                birthDate: birthDate,
                admissionDate: admissionDate,
                studentCurrentYear: studentCurrentYear,
                email: email,
                adminId : decoded.admin_id,
                division: division,
                grno : grno
              }
              
            const student = await STUDENT.create(recordObj)
            let bcryptedpassword = await hashPassword(req.body.password);
            const passwordInfo = await PASSWORD.create({userId : student._id , password : bcryptedpassword})

            if(student && passwordInfo){
              return res.status(200).json({
                isSuccess : true,
                message: "Student created successfully",
                data: student,
              });
            }
          })  
        } catch (error) {
          return res.json({isSuccess : false, message :"Request Failed!!"});
        }
      },

      edit: async function (req, res) {
        try {
          let { surname, name , fatherName, mobile, standard, fees, batch, address, birthDate, admissionDate, studentCurrentYear, email ,   division , grno} = req.body;
          var token = req.headers.authorization?.split(" ")[1];
          if(!token){
            return res.status(400).json({isSuccess : false, message:"Token is required."});
          }
          const studentInfo = await STUDENT.findById({_id: req.query.id})
          if(!studentInfo){
            return res.status(200).json({
                isSuccess : false,
                message: "Student not Found!!"
              });
          }
          jwt.verify(token, process.env.TOKEN_KEY, async function (err, decoded) {

            console.log(studentInfo.adminId , decoded.admin_id)
            if(studentInfo.adminId == decoded.admin_id){
              let student  = await STUDENT.findOneAndUpdate(
                { _id: req.query.id },
                {
                  $set: { 
                    surname: surname,
                    name: name,
                    fatherName :fatherName,
                    mobile : mobile,
                    standard : standard,
                    fees : fees,
                    batch : batch,
                    address : address,
                    birthDate: birthDate,
                    admissionDate: admissionDate,
                    studentCurrentYear: studentCurrentYear,
                    email: email,
                    division: division,
                    grno : grno
                  }
                },
              )
              console.log(student)
            return res.status(200).json({
              isSuccess : true,
              message: "Student Update successfully",
              data: student,
            });

          }

          })  
        } catch (error) {
          return res.json({isSuccess : false, message :"Request Failed!!"});
        }
      },

      deleteOne: async (req,res) =>{
        try {
          const studentInfo = await STUDENT.findById({_id: req.query.id})
          if(!studentInfo){
            return res.status(200).json({
                isSuccess : false,
                message: "Student not Found!!"
              });
          }
          let student = await STUDENT.findByIdAndRemove({_id: req.query.id})
          if(student){
            return res.status(200).json({
                isSuccess : true,
                message: "Student deleted successfully",
                data: student,
              });
          }
            
          } catch (error) {
            return res.json({isSuccess : false, message :"Something wrong!!"});
          }
      },
      deleteMany:  async (req,res) =>{
        try {
          let deleteManyId = req.body.deleteManyId;
          let student = await STUDENT.deleteMany({_id: { $in: deleteManyId }});

          if(!student){
            return res.status(200).json({
              isSuccess : false,
              message: "Something wrong!!"
            });
          }
          else{
            return res.status(200).json({
              isSuccess : true,
              message: "Selected Record is deleted",
            });
          }
          
          } catch (error) {
            return res.json({isSuccess : false, message :"Something wrong!!"});
          }
      },
      getById : async (req,res) => {
        try {
          const studentInfo = await STUDENT.findById({_id: req.query.id})
          if(!studentInfo){
            return res.status(200).json({
                isSuccess : false,
                message: "Student not Found!!"
              });
          }
          else{
            return res.status(200).json({
              isSuccess : true,
              message: "Student Find successfully!!",
              data : studentInfo
            });
          }
          } catch (error) {
            return res.json({isSuccess : false , message : 'Request Faild!'});
          }
    },
}

async function hashPassword (psw) {

  const password = psw
  const saltRounds = 10;

  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function(err, hash) {
      if (err) reject(err)
      resolve(hash)
    });
  })

  return hashedPassword
}