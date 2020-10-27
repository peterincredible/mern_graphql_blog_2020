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
  createUser(user_details:create_user_input): user
}`
let User = require('../models/user');
let data = {
    createUser: async ({user_details})=>{
         try{
               let data = await User.findOne({email:user_details.email});
               if(!data){
                   let user = new User({...user_details});
                   await user.save()
                   return user;
               }
               throw new Error("there was an error")
         }catch(err){
             console.log("there was an error in the graphql route createUser ")
         }
    },
    query_users:  async ()=> await User.find({})
}

module.exports = data;