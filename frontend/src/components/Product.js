import React, {useEffect, useState} from 'react'
import {Table} from "react-bootstrap";
import Axios from "axios";
import EditProduct from './EditProduct'
import {Link} from "react-router-dom";
import Swal from 'sweetalert2'


//Dashboard page but with every product and CURD
const Dashboard = ()=>{

    const [data , setData] = useState([]);

    useEffect(() =>{
        Axios.get("http://localhost:2999/products/").then((res)=>{
            setData(res.data.data)
        });
    },[])

    const deleteProduct = (id)=> {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Axios.delete(`http://localhost:2999/products/${id}`).then((res)=>{
                    console.log("data deleted successfully")
                    setData(res.data.data);

                });
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
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
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Product Name</th>
                    <th>Product Price</th>
                    <th>Product Type</th>
                    <th>Product Profit Percentage</th>
                    <th>Control</th>
                </tr>
                </thead>
                <tbody>
                {
                    data.map((value, index)=>{
                        return (
                            <tr key={value.id}>
                                <td>{index}</td>
                                <td>{value.product_name}</td>
                                <td>{value.product_price}</td>
                                <td>{value.product_type}</td>
                                <td>{value.profit_percentage}</td>
                                <td>
                                    <Link to={"/editProduct/"+value.id}> <button className="btn btn-primary">Edit</button></Link>
                                    <button className="btn btn-danger ml-sm-3" onClick={()=>{deleteProduct(value.id)}}>delete</button>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </Table>

        </main>
    )
}
export default Dashboard;