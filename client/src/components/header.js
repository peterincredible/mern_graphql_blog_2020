import React from "react"
import {NavLink,Link} from "react-router-dom"

let Header = (props)=>{

return (
        <div className="myheader shadow-sm">
            <div style={{width:"80%"}} className="mx-auto">
            <nav class="navbar navbar-expand-lg navbar-light px-4">
                <Link to="#" className="navbar-brand "
                  style={{backgroundClip:"rgb(59, 58, 58)",
                        fontWeight:600
                    }}>
                    Navbar</Link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <form class="form-inline my-2 my-lg-0  px-3 py-2 my-rounded">
                        <input className="form-control  search_input " type="search" placeholder="Search" aria-label="Search"/>
                        <div className="grey-bg d-flex justify-content-center align-items-center px-2 " style={{height:"35px"}}><i class="fas fa-search"></i></div>
                    </form>
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <NavLink className="nav-link sa p-2" to="#" >Log in</NavLink>
                        </li>
                        <li class="nav-item">
                            <NavLink className="nav-link ca" to="#" tabindex="-1" aria-disabled="true">Create account</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>

            </div>
        </div>
 )
}

export default Header;