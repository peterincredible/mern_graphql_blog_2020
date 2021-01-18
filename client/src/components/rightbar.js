
import React,{ Fragment } from "react";
import Rightbar_post from "./rightbar_post"


let Rightbar = (props)=>{
    let temp_arr = [1,2,3,4,5,6]
    return (
        <Fragment>
            <div className="rightbar">
                <h5>Trending Post</h5>
                <ul>
                    {temp_arr&&temp_arr.map((data,i)=><li><Rightbar_post index={i}/></li>)}
                </ul>
            </div>
        </Fragment>
    )
}

export default Rightbar;