import { useState, useEffect } from 'react';
import * as network from '../Network.js';
import * as stack from "../Stack.js";
import * as tokenStore from "../TokenStore.js";

function DeleteOrderDetailPage(props) {

    const orderDetail = props.orderDetail;

    const [error, setError] = useState(null);

    function onClickGoBack(ev) {
        stack.goBack();
    }

    async function handleSubmit(ev) {
        ev.preventDefault();
        try {
            await network.deleteOrderDetail(orderDetail.id);
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
                <h3>Eliminando detalle de pedido</h3>
                <form onSubmit={handleSubmit}>
                    <p><b>Id</b>:{orderDetail.id}</p>
                    <p><b>Id del pedido</b>: {orderDetail.orderId}</p>
                    <p><b>Producto</b>: {orderDetail.productName}</p>
                    <p><b>Cantidad</b>: {orderDetail.quantity}</p>
                    <button type="submit">Eliminar</button>
                </form>
                
            </div>
        );

    }
}

export default DeleteOrderDetailPage;
