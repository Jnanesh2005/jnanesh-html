import { useEffect, useState } from "react";
import PageHeader from "../header/PageHeader";
import axios from 'axios'

function PizzaList() {
    const [pizzas, setPizzas] = useState([{id:'',name:'',size:'',toppings:'',order_status:''}]);
    const readAllPizzas = async () => {
        try {
            const baseUrl = 'http://localhost:8080';
            const response = await axios.get(`${baseUrl}/pizzas`);
            const queriedPizzas = response.data;
            setPizzas(queriedPizzas);
        } catch (error) {
            alert('Server Error');
        }
    };

    const deletePizza = async (id) => {
        // eslint-disable-next-line no-restricted-globals
        if (!confirm("Are you sure to delete?")) {
            return;
        }
        const baseUrl = "http://localhost:8080";
        try {
            const response = await axios.delete(`${baseUrl}/pizzas/${id}`);
            alert(response.data.message);
            await readAllPizzas();
        } catch (error) {
            alert('Server Error');
        }
    };

    useEffect(() => {
        readAllPizzas();
    }, []);
    return (
        <>
            <PageHeader />
            <h3>List of Pizzas</h3>
            <div className="container">
                <table className="table table-success table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Pizza Name</th>
                            <th scope="col">Size</th>
                            <th scope="col">Toppings</th>
                            <th scope="col">Order Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {(pizzas && pizzas.length > 0) ? pizzas.map(
                            (pizza) => {
                                return (
                                    <tr key={pizza.id}>
                                        <th scope="row">{pizza.id}</th>
                                        <td>{pizza.name}</td>
                                        <td>{pizza.size}</td>
                                        <td>{pizza.toppings}</td>
                                        <td>{pizza.order_status}</td>
                                        <td>
                                            <a href={`/pizzas/view/${pizza.id}`} className="btn btn-success">View</a>
                                            &nbsp;
                                            <a href={`/pizzas/edit/${pizza.id}`} className="btn btn-warning">Edit</a>
                                            &nbsp;
                                            <button className="btn btn-danger" onClick={() => deletePizza(pizza.id)}>Delete</button>
                                        </td>
                                    </tr>
                                );
                            }
                        ) : <tr><td colSpan="6">No Data Found</td></tr>}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default PizzaList;
