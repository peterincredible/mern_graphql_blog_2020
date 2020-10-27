`type post{
    author_id:ID!
    id:ID!
    post_title:String
    post_content:String
    post_tag:String
  }
  input create_post_input{
    author_id:ID!
    post_title:String
    post_content:String
    post_tag:String
  }
  
  type Query{
    query_users:[user]
  
  }
  
  type Mutation {
    createUser(user_details:create_user_input): user
    createPost(input:create_post_input):post
    editPost(input:ID):post
    deletePost(input:ID):post
  }`

  let post = require("../models/post");
