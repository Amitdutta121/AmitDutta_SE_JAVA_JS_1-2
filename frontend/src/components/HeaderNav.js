import React from "react";
import {Link} from "react-router-dom";


//Header navigation
const HeaderNav = ()=>{
    function userSignOut() {
        localStorage.clear();
        window.location.reload(true);

    }

    return (
        <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
            <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Company name</a>
            <input className="form-control form-control-dark w-100" type="text" placeholder="Search"
                   aria-label="Search"/>
            <ul className="navbar-nav px-3">

                {(localStorage.getItem('userData') == null) ?<li className="nav-item text-nowrap">
                    <Link to="/login"> <span className="nav-link">Login</span></Link>
                </li>:""}



            </ul>
            <ul className="navbar-nav px-3">
                <li className="nav-item text-nowrap">
                    <a className="nav-link" href="#" onClick={userSignOut}>Sign out</a>
                </li>
            </ul>
        </nav>
    )
}
export default HeaderNav;