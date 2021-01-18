

const post = require("../models/post");
  let Post = require("../models/post");
  let {get_Author}= require("./helper_func")
  module.exports = {
      query_post:async({input})=>{
        console.log("yup")
        console.log(input);
          try{
                console.log(input.id);
                let posts = await Post.findById(input.id)
                console.log(typeof posts._doc.author)
                return {...posts._doc,id:post._doc._id,author:get_Author.bind(this,post._doc.author)}
          }catch(err){
              console.log("there was an error in the graphql query post route")
          }
          
      },
      query_posts:async(req)=>{
          console.log(req)
        try{
          let posts = await Post.find({})
          console.log(typeof posts[0]._doc.author)
          let temp_data = posts.map(post=>({...post._doc,
                                  id:post._doc._id,
                                  author:get_Author.bind(this,post._doc.author)
                              }))
        //   temp_data.post_tag = temp_data.post_tag.join("");
        let temp = temp_data.map(data=>({...data,post_tag:data.post_tag.join("")}))
        console.log(temp)
        
          return temp;
        }catch(err){
            console.log("there was an error in the graphql query post route")
        }
        
    },
      createPost: async ({input})=>{
          try{
              let new_post;
              new_post = new Post({...input})
              if(!new_post){
                  throw new Error("error");
              }
              await new_post.save();
              console.log(new_post._doc.author)
              console.log(get_Author.bind(this,new_post._doc.author))
              let data = {...new_post._doc,id:new_post._doc._id,author:get_Author.bind(this,new_post._doc.author)}
              return data;

          }catch(err){
              console.log("there was an error in the create post graphql route")
          }

      },
      editPost: async ({input})=>{
        try{
            let edit_post;
            edit_post = await Post.findByIdAndUpdate(input.id,
                                                             {post_content:input.post_content,
                                                              post_title:input.post_title,
                                                              post_tag:input.post_tag
                                                            },
                                                            {new:true})
            console.log(edit_post)
            if(!edit_post){
                throw new Error("error");
            }
            await edit_post.save();
            let data = {...edit_post._doc,id:edit_post._doc._id,author:get_Author.bind(this,edit_post._doc.author)}
            return data;

        }catch(err){
            console.log("there was an error in the edit post graphql route")
            console.log(err)
        }

    },
      deletePost: async ({input},{user})=>{
        try{
            let delete_post;
            if(user.id != input){
               throw "error"
            }
            delete_post = await Post.findByIdAndDelete(input)
            if(!delete_post){
                throw new Error("error");
            }
            let data = {...delete_post._doc,id:delete_post._doc._id,author:get_Author.bind(this,delete_post._doc.author)}
            return data;

        }catch(err){
            console.log("there was an error in the delete post graphql route")
            console.log(err)
            return null
        }

    }
  }
