let express = require("express")
let app = express();
let {graphqlHTTP} = require("express-graphql")
let mongoose = require("mongoose")

let schema = require("./graphql_files/qraphql_schema");
let user_rootValue = require("./graphql_files/graphql_user_root_values");
app.use("/graphql",graphqlHTTP({
    schema,
    rootValue:{...user_rootValue},
    graphiql:true

}))
mongoose.connect("mongodb://localhost/react_blog_2020",{useNewUrlParser: true},(error)=>{
    if(error){
        console.log("there was an error the db did not start up")
        return
    }
    app.listen(5000,()=>{
        console.log("log is listening at port 5000");
        console.log("done")
    })
})




