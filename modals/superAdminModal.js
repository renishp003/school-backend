const mongoose = require('mongoose');

let superAdminSchema = new mongoose.Schema(
    {
        email : {
            type: String,
            required: true,
            trim: true
        },
        password : {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("superAdmin", superAdminSchema);