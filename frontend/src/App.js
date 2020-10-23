import React from 'react';
import './App.css';
import Navbar from "./components/Navbar"
import Dashboard from "./components/Dashboard";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import HeaderNav from './components/HeaderNav'
import Product from './components/Product'
import CreateNewProduct from './components/CreateNewProduct'
import EditProduct from './components/EditProduct'
import Login from './components/Login'
import About from './components/About'
import PleaseLogin from './components/PleaseLogin'

function App() {
  return (
    <>
        <Router>
            <div>
                <HeaderNav/>
                <div className="container-fluid">
                    <div className="row">
                        {/*Initialize navbar*/}
                        <Navbar/>
                        <Switch>
                            <Route exact path="/">.
                                {(localStorage.getItem('userData') != null) ?<Dashboard/>:<PleaseLogin/>}
                            </Route>
                            <Route exact path="/product">
                                {(localStorage.getItem('userData') != null) ?<Product/>:<PleaseLogin/>}
                            </Route>
                            <Route exact path="/addProduct">
                                {(localStorage.getItem('userData') != null) ?<CreateNewProduct/>:<PleaseLogin/>}
                            </Route>
                            <Route exact path="/editProduct/:id">
                                {(localStorage.getItem('userData') != null) ?<EditProduct/>:<PleaseLogin/>}
                            </Route>
                            <Route exact path="/login">
                                <Login/>
                            </Route>
                            <Route exact path="/about">
                                <About/>
                            </Route>
                        </Switch>
                    </div>
                </div>
                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}

            </div>
        </Router>

    </>
  );
}

export default App;
