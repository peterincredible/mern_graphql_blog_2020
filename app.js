let express = require("express")
let app = express();
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
    allowedFormats: ['jpg', 'png']
  });
  let upload = multer({ storage: storage })

let schema = require("./graphql_files/qraphql_schema");
let user_rootValue = require("./graphql_files/graphql_user_root_values");
let post_rootValue = require("./graphql_files/graphql_post_root_values");
app.use("/graphql",graphqlHTTP({
    schema,
    rootValue:{...user_rootValue,...post_rootValue},
    graphiql:true

}))
app.post("/uploads/image",upload.single('image'),(req,res)=>{
    try{
        console.log("uploads/images route triggered"+ req.file)
    }catch(err){
        console.log(err)
    }
    
})
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




