const mongoose = require('mongoose');

let adminSchema = new mongoose.Schema(
    {
        email : {
            type : String,
            require: true,
            lowercase: true,
            match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            unique: true,
            trim: true
        },
        branch:{
            type : String,
            require: true,
            trim: true
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("admin", adminSchema);