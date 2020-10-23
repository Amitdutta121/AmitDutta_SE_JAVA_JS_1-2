import React, {useEffect, useState} from 'react'
import {Table} from "react-bootstrap";
import Axios from "axios";


const Dashboard = ()=>{
    const [data , setData] = useState([]);

    useEffect(() =>{
        Axios.get("http://localhost:2999/products/mostSold").then((res)=>{
            console.log(res.data.data)
            setData(res.data.data)
        });
    },[])
    return (
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
            <div
                className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                <h1 className="h2">Dashboard</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                </div>
            </div>
            <h2>Popular data</h2>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Product Name</th>
                    <th>Product Price</th>
                    <th>Product Type</th>
                    <th>Product Profit Percentage</th>
                </tr>
                </thead>
                <tbody>
                {
                    data.map((value, index)=>{
                        return (
                            <tr key={index}>
                                <td>{index}</td>
                                <td>{value.product_name}</td>
                                <td>{value.product_price}</td>
                                <td>{value.product_type}</td>
                                <td>{value.profit_percentage}</td>
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