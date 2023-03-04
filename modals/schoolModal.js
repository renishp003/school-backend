const mongoose = require('mongoose');

const schoolSchema = mongoose.Schema({
    email : {
        type: String,
        required: true,
        trim: true,
        unique:true
    },
    schoolName:{
        type : String,
        require: true,
        trim: true,
        unique : true
    }
}, {
    timestamps: true,
}
)

module.exports = mongoose.model("school", schoolSchema);