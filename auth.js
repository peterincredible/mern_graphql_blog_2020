let jwt = require("jsonwebtoken");
let authenthicate = async (req,res,next)=>{
  try{
      let temp = req.headers.authorization
      let auth_data = jwt.verify(temp,process.env.SECRET_KEY)
      let user = {name:auth_data.name,
                  email:auth_data.email,
                  image:auth_data.image,
                  image_id:auth_data.image_id,
                  role:auth_data.role,
                  id:auth_data.id
                }
      req.user = user
      next()
      
  }catch(err){
      console.log("an error in the auth middleware")
      req.user = null
      next()
      
  }
}
module.exports = authenthicate