const mongoose = require('mongoose');

let passwordSchema = new mongoose.Schema(
    {
        password : {
            type: String,
            required: true,
            trim: true
        },
        userId : {
            type: String,
            required: true,
            trim: true
        },
        userRoll : {
            type : String,
            required : true,
            trim : true
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("password", passwordSchema);