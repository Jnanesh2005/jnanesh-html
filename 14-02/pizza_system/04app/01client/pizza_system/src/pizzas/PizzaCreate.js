import { useState } from "react";
import PageHeader from "../header/PageHeader";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

function PizzaCreate() {
    const [pizza, setPizza] = useState({id:'',name:'',size:'',toppings:'',order_status:''});
    const navigate = useNavigate();
    const txtBoxOnChange = event => {
        const updatablePizza = {...pizza};
        updatablePizza[event.target.id] = event.target.value; //updatablePizza['name'] = event.target.value;
        setPizza(updatablePizza);
    };
    const createPizza = async () => {
        const baseUrl = "http://localhost:8080"
        try {
            const response = await axios.post(`${baseUrl}/pizzas`,{...pizza})
            const createdPizza = response.data.pizza;
            setPizza(createdPizza);
            alert(response.data.message)
            navigate('/pizzas/list')
        } catch(error) {
            alert('Server Error');
        }
    };
    
    return(
        <>
            <PageHeader/>            
            <h3><a href="/pizzas/list" className="btn btn-light">Go Back</a>Add Pizza</h3>
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
                <button className="btn btn-primary"
                    onClick={createPizza}>Create Pizza</button>
            </div>
        </>
    );
}

export default PizzaCreate;
