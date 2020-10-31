let User = require("../models/user");
let Post = require("../models/post");
let get_Author =  async (id)=>{
  try{
      let author = await User.findById(id);
      if(!author){
          throw new Error("error")
      }
      return {...author._doc,id:author._doc._id,posts:get_Posts.bind(this,author._doc._id)};

  }catch(err){
      console.log("there was an error in the graphql User helper function")
  }
}
let get_Posts = async (id)=>{
    let posts = await Post.find({author:id})
    let data = posts.map(post=>({...post._doc,
        id:post._doc._id,
        author:get_Author.bind(this,post._doc.author)
    
    }))
    console.log(data);
    return data;
}
module.exports = {get_Author,get_Posts};