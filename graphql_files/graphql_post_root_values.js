`type post{
    author:user
    id:ID!
    post_title:String
    post_content:String
    post_tag:String
  }
 
  
  type Query{
    query_post:[post]
  
  }

  input create_post_input{
    author_id:ID
    post_title:String
    post_content:String
    post_tag:String
  }
  input edit_post_input{
    id:ID
    post_content:String
  }
  
  type Mutation {
    createUser(user_details:create_user_input): user
    createPost(input:create_post_input):post
    editPost(input:edit_post_input):post
    deletePost(input:ID):post
  }`

const post = require("../models/post");
  let Post = require("../models/post");
  let {get_Author}= require("./helper_func")
  module.exports = {
      query_post:async()=>{
          try{
            let posts = await Post.find({})
            console.log(typeof posts[0]._doc.author)
            return posts.map(post=>({...post._doc,
                                    id:post._doc._id,
                                    author:get_Author.bind(this,post._doc.author)
                                }))
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
      deletePost: async ({input})=>{
        try{
            let delete_post;
            delete_post = await Post.findByIdAndDelete(input)
            if(!delete_post){
                throw new Error("error");
            }
            let data = {...delete_post._doc,id:delete_post._doc._id,author:get_Author.bind(this,delete_post._doc.author)}
            return data;

        }catch(err){
            console.log("there was an error in the delete post graphql route")
            console.log(err)
        }

    }
  }
