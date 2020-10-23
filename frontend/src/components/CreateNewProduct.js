import React from "react";
import { useForm } from "react-hook-form";
import http from '../http-common'
import Swal from 'sweetalert2'
import {useHistory} from "react-router-dom";


//Create new product
const CreateNewProduct = ()=>{

    //react form hook
    const { register, handleSubmit, watch, errors } = useForm();
    //use history for redirect
    let history = useHistory();

    //form on submit data
    const onSubmit = (data,e) => {
        //data builder
        let mainData = {
            name: data.name,
            price: data.price,
            profit: data.profit,
            category: data.category,
            config: JSON.parse(localStorage.getItem('userData')).config
        }
        //Http request with axios to add product
        http.post('/addProduct',mainData).then(response=>{
            Swal.fire({
                title: 'Product Created',
                icon: 'success'
            }).then((result)=>{
                history.push("/product")
            })

        })

    }

    return (
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
            <div
                className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                <h1 className="h2">Products</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <table className=" table table-bordered">
                    <thead>
                    <tr>
                        <th style={{width: '10px'}}>#</th>
                        <th>Task</th>
                        <th>Input</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1.</td>
                        <td>Product Name</td>
                        <td>
                            <input type="text" name="name" className="form-control"
                                   autoComplete="off" ref={register({ required: true })}/>
                            {errors.name && <span className="bg-danger"> Name required</span>}
                        </td>
                    </tr>
                    <tr>
                        <td>2.</td>
                        <td>Product Price</td>
                        <td>
                            <input type="number"  name="price" className="form-control"
                                   autoComplete="off" ref={register({ required: true })}/>
                            {errors.price && <span className="bg-danger"> Price is required and must be number</span>}
                        </td>
                    </tr>
                    <tr>
                        <td>3.</td>
                        <td>Profit Percentage</td>
                        <td>
                            <input type="number"  name="profit" className="form-control"
                                   autoComplete="off" ref={register({ required: true, min:0, max:100 })}/>
                            {errors.profit && <span className="bg-danger"> profit is required and must be between 0-100</span>}
                        </td>
                    </tr>
                    <tr>
                        <td>4.</td>
                        <td>Product Type</td>
                        <td>
                            <select name="category" className="form-control" ref={register({ required: true })}>
                                <option value="Motherboard">Motherboard</option>
                                <option value="Ram">Ram</option>
                                <option value="Graphics Card">Graphics Card</option>
                            </select>
                            {errors.category && <span className="bg-danger">You must select an category</span>}
                        </td>
                    </tr>
                    <tr>
                        <td>5.</td>
                        <td>Submit</td>
                        <td>
                            <button className="btn btn-success">Submit</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>

        </main>
    )
}

export default  CreateNewProduct;