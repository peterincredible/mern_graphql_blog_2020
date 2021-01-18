import React,{Fragment} from "react";


let Post = (props)=>{

    return(
        <Fragment>
            <div className="post shadow-sm bg-white p-3 mb-1">
                <h5>First Heading</h5>
                <p>{props.index}</p>
            </div>
        </Fragment>
    )
}

export default Post;