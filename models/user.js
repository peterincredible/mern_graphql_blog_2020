let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"normal"
    }
})

let user = mongoose.model("user",userSchema);
module.exports = user;