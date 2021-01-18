let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let postSchema = new Schema({
    author:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"user"
    },
    post_title:{
        type:String,
        required:true
    },
    post_content:{
        type:String,
        required:true
    },
    post_tag:[{
        type:String
    }],
    post_Topic:[{type:String}]
  
})

let post = mongoose.model("post",postSchema);
module.exports = post;