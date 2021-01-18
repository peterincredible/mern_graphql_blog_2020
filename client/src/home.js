import React from "react"
import Header from "./components/header"
import Footer from "./components/footer"
import Sidebar from "./components/sidebar"
import Post from "./components/post";
import  Rightbar from "./components/rightbar";



let Home = (props)=>{
let temp_arr = [1,2,3,4,5,6,7,8,9,34,56,78,90,65,54]
return (
    <div className="mycontainer">
        <Header/>
        <div className="mycontent">
            <div className="mx-auto p-4 d-flex" style={{width:"80%"}}>
                <Sidebar/>
                <div className=" main">
                    <h5>new post</h5>
                     {temp_arr.map((data,i)=><Post index={i} key={i}/>)}
                </div>
                <Rightbar/>
            </div>
        </div>
        <Footer/>
    </div>
)
}

export default Home;