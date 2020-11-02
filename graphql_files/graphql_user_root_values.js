`input create_user_input{
    name:String
    username:String
    email:String
    password:String
}

type Query{
  query_users:[user]
}

type Mutation {
  query_user(input:query_user_input):user
  createUser(user_details:create_user_input): user

}`
let {get_Posts} = require("./helper_func");
let User = require('../models/user');
const user = require("../models/user");
const bcryptjs = require("bcrypt");
let data = {
    createUser: async ({user_details})=>{
         try{
               let data = await User.findOne({email:user_details.email});
               if(!data){
                  
                   let user = new User({...user_details});
                   user.password= bcryptjs.hashSync(user.password,10);
                   await user.save()
                   return user;
               }
               throw new Error("there was an error")
         }catch(err){
             console.log("there was an error in the graphql route createUser ")
         }
    },
    query_users:  async ()=> {
         let users= await User.find({})
         let data =  users.map(user=>({
           ...user._doc,
           id:user._doc._id,
           posts: get_Posts.bind(this,user._doc._id) 
         }))
         console.log(data[0].posts)  
         return data;
    },
    query_user:async ({input})=> {
      try{
        let user = await User.findOne({...input})
        if(!user){
          throw new Error()
        }
        console.log(user)
      }catch(err){
        console.log("there was an error in the query_user graphql route")
      }
      
     /* let data =  users.map(user=>({
        ...user._doc,
        id:user._doc._id,
        posts: get_Posts.bind(this,user._doc._id) 
      }))
      console.log(data[0].posts)  
      return data;*/
 }
}

module.exports = data;