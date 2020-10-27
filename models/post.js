let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let postSchema = new Schema({
    author_id:{
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
        type:String,
        required:true
    }]
  
})

let post = mongoose.model("post",postSchema);
module.exports = post;