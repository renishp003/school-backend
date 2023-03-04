const mongoose = require('mongoose');

let enquireSchema = new mongoose.Schema(
    {
        email : {
            type : String,
            require: true,
            lowercase: true,
            match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            trim: true
        },
        branchId:{
            type : String,
            require: true,
            trim: true
        },
        name :{
            type : String,
            require: true,
            trim: true
        },
        parentsName : {
            type : String,
            require: true,
            trim: true
        },
        mobile:{
            type : Number,
            require: true,
            trim: true
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("enquire", enquireSchema);