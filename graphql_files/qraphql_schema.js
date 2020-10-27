let {buildSchema} = require("graphql");
module.exports = buildSchema(`
type user{
    id:ID!
    name:String
    username:String
    email:String
    password:String
    role:String
}

input create_user_input{
    name:String
    username:String
    email:String
    password:String
}
type post{
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