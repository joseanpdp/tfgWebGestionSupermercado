import { useState, useEffect } from 'react';
import * as network from '../Network.js';
import * as stack from "../Stack.js";
import * as tokenStore from "../TokenStore.js";

function DeleteOrderPage(props) {

    const order = props.order;

    const [error, setError] = useState(null);

    function onClickGoBack(ev) {
        stack.goBack();
    }

    async function handleSubmit(ev) {
        ev.preventDefault();
        try {
            await network.deleteOrder(order.id);
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
                <h3>Eliminando pedido</h3>
                <form onSubmit={handleSubmit}>
                    <p><b>Id</b>:{order.id}</p>
                    <p><b>De</b>: {order.customerName} {order.customerSurname}</p>
                    <p><b>Fecha</b>: {order.date}</p>
                    <p><b>Dirección del pedido</b>: {order.shipAddress}</p>
                    <button type="submit">Eliminar</button>
                </form>
                
                
            </div>
        );

    }
}

export default DeleteOrderPage;
