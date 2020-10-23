import React from "react";

//Static page for error and get redirect into login page
const PleaseLogin = ()=>{
    return(
        <>
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                <div
                    className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                    <div className="btn-toolbar mb-2 mb-md-0">
                        <div className="col-sm-12">
                            <h1>Please Login</h1>
                        </div>
                    </div>
                </div>
            </main>

        </>
    )
}

export default PleaseLogin;