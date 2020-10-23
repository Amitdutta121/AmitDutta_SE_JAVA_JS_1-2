import React from 'react'
import {Link, useHistory} from "react-router-dom";
import {useForm} from "react-hook-form";
import {users} from "../http-common";


//Login Page
const Login = (props)=>{
    const { register, handleSubmit, watch, errors } = useForm();
    let history = useHistory();


    const onSubmit =  (data,e)=> {
        let mainData = {
            username : data.username,
            password : data.password
        }
        users.post('/auth',mainData).then(response=>{
            localStorage.setItem("userData", JSON.stringify({
                config: {
                    username: data.username,
                    password: data.password
                },
                type: response.data.type
            }))
            console.log("Login success")

            history.push("/")
            window.location.reload(true);

        })
    }

    return (
        <>
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                <div
                    className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                    <h1 className="h2">Login</h1>
                    <div className="btn-toolbar mb-2 mb-md-0">
                    </div>


                </div>
                <div className="col-sm-5" style={{marginLeft: '30%', marginTop:'5%'}}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Username</label>
                            <input type="text" name="username" className="form-control" placeholder="Enter Username" ref={register({ required: true })}/>
                            <small id="emailHelp" className="form-text text-muted">We'll never share your username with
                                anyone else.</small>
                        </div>

                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1"
                                   placeholder="Password" name="password" ref={register({ required: true })}/>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>

                </div>


            </main>
        </>
    )
}
export default Login;