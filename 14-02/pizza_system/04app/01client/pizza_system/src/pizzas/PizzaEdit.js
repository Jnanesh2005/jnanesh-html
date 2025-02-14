import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../header/PageHeader";
import axios from 'axios'

function PizzaEdit() {
    const [pizza, setPizza] = useState({id:'',name:'',size:'',toppings:'',order_status:''});
    const params= useParams();
    const navigate = useNavigate();
    const txtBoxOnChange = event => {
        const updatablePizza = {...pizza};
        updatablePizza[event.target.id] = event.target.value;
        setPizza(updatablePizza);
    };
    const readById = async () => {
        const baseUrl = "http://localhost:8080"
        try {
            const response = await axios.get(`${baseUrl}/pizzas/${params.id}`)
            const queriedPizza = response.data;
            setPizza(queriedPizza);
        } catch(error) {
            alert('Server Error');
        }
    };
    const updatePizza = async () => {
        const baseUrl = "http://localhost:8080"
        try {
            const response = await axios.put(`${baseUrl}/pizzas/${params.id}`,{...pizza})
            const updatedPizza = response.data.pizza;
            setPizza(updatedPizza);
            alert(response.data.message)
            navigate('/pizzas/list')
        } catch(error) {
            alert('Server Error');
        }
    };
    useEffect(() => {
        readById();
    },[]);
    return(
        <>
            <PageHeader/>
            
            <h3><a href="/pizzas/list" className="btn btn-light">Go Back</a>Edit Pizza</h3>
            <div className="container">
                <div className="form-group mb-3">
                    <label for="name" className="form-label">Pizza Name:</label>
                    <input type="text" className="form-control" id="name" 
                        placeholder="please enter pizza name"
                        value={pizza.name} 
                        onChange={txtBoxOnChange}/>
                </div>
                <div className="form-group mb-3">
                    <label for="size" className="form-label">Pizza Size:</label>
                    <input type="text" className="form-control" id="size" 
                        placeholder="please enter pizza size"
                        value={pizza.size} 
                        onChange={txtBoxOnChange}/>
                </div>
                <div className="form-group mb-3">
                    <label for="toppings" className="form-label">Pizza Toppings:</label>
                    <input type="text" className="form-control" id="toppings" 
                        placeholder="please enter pizza toppings"
                        value={pizza.toppings} 
                        onChange={txtBoxOnChange}/>
                </div>
                <div className="form-group mb-3">
                    <label for="order_status" className="form-label">Order Status:</label>
                    <input type="text" className="form-control" id="order_status" 
                        placeholder="please enter order status"
                        value={pizza.order_status} 
                        onChange={txtBoxOnChange}/>
                </div>
                <button className="btn btn-warning"
                    onClick={updatePizza}>Update Pizza</button>
            </div>
        </>
    );
}

export default PizzaEdit;
