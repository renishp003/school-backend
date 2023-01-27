const mongoose = require('mongoose');

const schoolSchema = mongoose.Schema({
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