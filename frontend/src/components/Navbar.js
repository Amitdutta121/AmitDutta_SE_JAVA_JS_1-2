import React from 'react'
import {
    Link
} from "react-router-dom";

const Navbar  = ()=>{
    return (
        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
            <div className="sidebar-sticky">
                <ul className="nav flex-column">

                    <li className="nav-item">
                        <Link className="nav-link active" to="/"> <span className="nav-link">Home</span></Link>
                    </li>
                    <li className="nav-item">
                        <span data-feather="file"></span>
                        <Link to="/product"> <span className="nav-link">Product</span></Link>

                    </li>
                    <li className="nav-item">
                        <span data-feather="file"></span>
                        <Link to="/addProduct"> <span className="nav-link">Add Product</span></Link>

                    </li>
                    <li className="nav-item">
                        <span data-feather="file"></span>
                        <Link to="/about"> <span className="nav-link">About</span></Link>

                    </li>

                </ul>


            </div>
        </nav>

    );
}

export default Navbar;