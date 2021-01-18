import React, { Fragment } from "react";
import {NavLink} from "react-router-dom";

let Rightbar_post = (props)=>{
    return(
        <Fragment>
            <NavLink to="#">post {props.index&& props.index}</NavLink>
            <div>
                <span>3 comments </span>
            </div>
        </Fragment>
    )

}

export default Rightbar_post;