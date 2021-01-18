import React, { Fragment } from "react";


let Temp_comp = (props)=>{

return(
    <Fragment>
          <div><h1>this is a temp_comp baby {props.match.params.id}</h1></div>
    </Fragment>
)
}

export default Temp_comp;