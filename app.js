let express = require("express")
let app = express();
let auth = require("./auth")
let User = require("./models/user")
let {graphqlHTTP} = require("express-graphql")
let mongoose = require("mongoose")
require("dotenv").config()
let multer = require("multer");
/*var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        console.log(Date.now())
        console.dir(file)
      cb(null, Date.now()+ "_"+file.originalname)
    }
  })
   */
const cloudinary = require('cloudinary').v2;
console.log(process.env.CLOUD_API_KEY)
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_API_SECRET 
  });
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req,file)=>({
        folder: 'react-blog-2020',
        format: "jpg"
    })
  });
  let upload = multer({ storage: storage })

let schema = require("./graphql_files/qraphql_schema");
let user_rootValue = require("./graphql_files/graphql_user_root_values");
let post_rootValue = require("./graphql_files/graphql_post_root_values");
app.use(auth)
app.use("/graphql",graphqlHTTP(req=>({
    schema,
    rootValue:{...user_rootValue,...post_rootValue},
    context:{user:req.user},
    graphiql:true

})))
app.post("/uploads/image",upload.single('image'), async (req,res)=>{
    try{
        console.log("uploads/images route triggered"+ req.file)
        let user = await User.findById(req.user.id)
      
        user.image = req.file.path;
        user.image_id = req.file.filename;
        await user.save()
        console.dir(req.file)
    }catch(err){
        console.log(err)
        console.log("an error in upload image")
    }
    
})
app.get("/delete/image/:id",async (req,res)=>{

       console.log(":before the try block")
    try{
        console.log(`react-blog-2020/${req.params.id}`)  
        cloudinary.uploader.destroy(`react-blog-2020/${req.params.id}`,function(err){
            if(err){
              console.log("there was an error deleting file from cloudnary")
            }
            else{
              console.log("file successfully deleted");
            }
          })
          
         
    }catch(err){
         res.status(400).send({error:"couldn't add your new post"});
    }
  }
  );
mongoose.connect("mongodb://localhost/react_blog_2020",{useNewUrlParser: true},(error)=>{
    if(error){
        console.log("there was an error the db did not start up")
        console.log(error)
        return
    }
    app.listen(5000,()=>{
        console.log("log is listening at port 5000");
        console.log("done")
    })
})




