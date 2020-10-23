import React, {useEffect} from "react";
import { useForm } from "react-hook-form";
import http from '../http-common'
import {useParams} from "react-router";
import Swal from 'sweetalert2'

//Edit product Page
const EditProduct = (props)=>{
    //get the params {/:id}
    let { id } = useParams();
    //use form hook
    const { register, handleSubmit, setValue , errors } = useForm();

    //Runon every render
    useEffect(()=>{
        http.get(`/singleProduct/${id}`).then(response=>{
            const responseData = response.data.data[0];
            setValue('name',responseData.product_name, {validation: true})
            setValue('price',responseData.product_price, {validation: true})
            setValue('profit',responseData.profit_percentage, {validation: true})
            setValue('category',responseData.product_type, {validation: true})
        })
    },[])

    //form data submit
    const onSubmit = (data)=>{
        //data builder
        let mainData = {
            name: data.name,
            price: data.price,
            profit: data.profit,
            category: data.category,
            config: JSON.parse(localStorage.getItem('userData')).config
        }

        //Call api to edit the product
        http.post(`/editProduct/${id}`,mainData).then(response=>{
            Swal.fire({
                title: 'Product Edited',
                icon: 'success'
            })

        })
    }

    return (

        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
            <div
                className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                <h1 className="h2">Update Product</h1>
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
                                <option value="RAM">Ram</option>
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

export default  EditProduct;