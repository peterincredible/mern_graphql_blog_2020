import React,{Fragment} from "react";
import {NavLink} from "react-router-dom";


let Sidebar = (props)=>{
    let sidebar_list = ["politics","religion","technology","gaming","health","crime","Sport"]
return(
  <Fragment>
            <div className=" mysidebar">
                <h5>Subsections</h5>
                <ul>
                    <li className="active-section"><NavLink to="#">general</NavLink></li>
                    {sidebar_list&&sidebar_list.map((topic,i)=><li><NavLink to={`/topic/${topic}`} key={i}>{topic}</NavLink></li>)}
                    
                </ul>
            </div>
    </Fragment>
) 
}

export default Sidebar;