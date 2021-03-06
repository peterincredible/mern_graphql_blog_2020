let {buildSchema} = require("graphql");
module.exports = buildSchema(`
type user{
    id:ID!
    name:String
    username:String
    email:String
    password:String
    image:String
    role:String
    posts:[post]
}

input create_user_input{
    name:String
    username:String
    email:String
    password:String
}
type post{
  author:user
  id:ID!
  post_title:String
  post_content:String
  post_tag:String
  post_topic:String
}
input create_post_input{
  author:ID!
  post_title:String
  post_content:String
  post_tag:String
}
input edit_post_input{
  id:ID
  post_title:String
  post_content:String

}
input query_user_input{
  email:String
  password:String
}
type token{
  t:String
}
input login_user_input{
  email:String
  password:String
}
input query_post_input{
  id:String
}
type Query{
  query_users:[user]
  query_posts:[post]
}

type Mutation {
  createUser(user_details:create_user_input): token
  login_user(input:login_user_input):token
  createPost(input:create_post_input):post
  query_post(input:query_post_input):post
  editPost(input:edit_post_input):post
  deletePost(input:ID):post
}
`)

/*
type tags{
    user_id:ID!
    user_tags:[String]
}
type posts{
    post_id:!D!
    post_title:String
    post_tags:[String]
  
}
*/ 