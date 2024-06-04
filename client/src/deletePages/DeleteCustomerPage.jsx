import { useState, useEffect } from 'react';
import * as network from '../Network.js';
import * as stack from "../Stack.js";
import * as tokenStore from "../TokenStore.js";

function DeleteCustomerPage(props) {

    const customer = props.customer;

    const [error, setError] = useState(null);

    function onClickGoBack(ev) {
        stack.goBack();
    }

    async function handleSubmit(ev) {
        ev.preventDefault();
        try {
            await network.deleteCustomer(customer.id);
            stack.goBack2();
        }
        catch (err) {
            setError(err);
        }
    }

    /* Conditional rendering */

    if (error !== null) {
        return (
           <>
                <main>
                    <p>Error: {error.message}</p>
                    
                </main>
            </>
        );
    }
    else {

        return (
            <div className='body'>
                <h3>Eliminando cliente</h3>
                <form onSubmit={handleSubmit}>
                    <p><b>Id</b>:{customer.id}</p>
                    <p><b>Nombre</b>: {customer.name} {customer.surname}</p>
                    <p><b>Dirección</b>: {customer.address}</p>
                    <button type="submit">Eliminar</button>
                </form>
                
            </div>
        );

    }
}

export default DeleteCustomerPage;
