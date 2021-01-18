`input create_user_input{
    name:String
    username:String
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
type Query{
  query_users:[user]
}

type Mutation {
  login_user(input:login_user_input):token
  createUser(user_details:create_user_input): token

}`
let {get_Posts} = require("./helper_func");
let User = require('../models/user');
const user = require("../models/user");
const bcryptjs = require("bcrypt");
let jwt = require("jsonwebtoken")
let data = {
    createUser: async ({user_details})=>{
         try{
               let data = await User.findOne({email:user_details.email});
               if(!data){
                  
                   let user = new User({...user_details});
                   user.password= bcryptjs.hashSync(user.password,10);
                   await user.save()
                   user = {
                    name:user.name,
                    id:user._id,
                    email:user.email,
                    password:user.password,
                    image:user.image,
                    image_id:user.image_id,
                    role:user.role
          
                  }
                  token = jwt.sign(user,process.env.SECRET_KEY)
                  console.log(token)
                  return {t:token}
                  
               }
               throw new Error("there was an error")
         }catch(err){
             console.log("there was an error in the graphql route createUser ")
         }
    },
    query_users:  async (args,{user})=> {
       try{
            console.log(user)
            if(!user){
               throw "error"
            }
            if(user.role == "normal") throw "error"
            let users= await User.find({})
            let data =  users.map(user=>({
              ...user._doc,
              id:user._doc._id,
              posts: get_Posts.bind(this,user._doc._id) 
            }))
            console.log(data[0].posts)  
            return data;

       }catch(err){
         
           console.log("there was an error in the query_users") 
           return null
       }
    },
    login_user:async ({input})=> {
      try{
        let user = await User.findOne({email:input.email})
        if(!user){
          throw "user email does not exist"
        }
        let test_user = bcryptjs.compareSync(input.password,user.password)
        if(!test_user){
          throw "password does not match"
        }
        user = {
          name:user.name,
          id:user._id,
          email:user.email,
          password:user.password,
          image:user.image,
          image_id:user.image_id,
          role:user.role

        }
        token = jwt.sign(user,process.env.SECRET_KEY)
        console.log(token)
        return {t:token}
      }catch(err){
        console.log(err)
      }
      
 }
}

module.exports = data;