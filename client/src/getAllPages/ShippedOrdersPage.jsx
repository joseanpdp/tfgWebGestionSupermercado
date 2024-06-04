import { useState, useEffect } from 'react';
import * as network from '../Network.js';
import * as stack from "../Stack.js";
import * as tokenStore from "../TokenStore.js";

function ShippedOrdersPage(props) {

    const [shippedOrders, setShippedOrders] = useState(null);

    const [error, setError]   = useState(null);
    let rowsShipped;

    /* Asynchronous data loading */

    async function asyncAction() {
        try {
            const shippedOrders = await network.getOrdersByStatus("SHIPPED");
            setShippedOrders(shippedOrders);
        }
            catch (err) {
            setError(err);
        }
    }

    function setupEffect() {
        asyncAction();
    }

    useEffect(setupEffect,[]);

    /* GUI Event handlers */

    function onClickShowOrder(ev) {
        const orderId = ev.currentTarget.dataset.id;
        stack.go({name:"OrderPage", data:orderId});
    }

    function onClickGoBack(ev) {
        stack.goBack();
    }

    /* Conditional rendering */

    if (error !== null) {
        return (
            <>
                <p>Error: {error.message}</p>
                
            </>
        );
    }
    else if (shippedOrders === null) {
        return (
            <p>Loading</p>
        );
    }
    else {
        if (shippedOrders != null) {
            rowsShipped = shippedOrders.map(order => 
                <div data-id={order.id} key={order.id} onClick={onClickShowOrder}>
                    <div>
                        <p>Id</p><p>{order.id}</p>
                    </div>
                    <div>
                        <p>Cliente</p><p>{order.customerName} {order.customerSurname}</p>
                    </div>
                    <div>
                        <p>Fecha</p><p>{order.date}</p>
                    </div>
                    <div>
                        <p>Dirección</p><p>{order.shipAddress}</p>
                    </div>
                </div>
            );
        }

        return (
            <>
                <main className="tabla-menu">
                    <div className="table">
                        <div>
                            <div>Id</div>
                            <div>Cliente</div>
                            <div>Fecha</div>
                            <div>Dirección</div>
                        </div>
                        {rowsShipped}
                    </div>
                </main>
            </>
        );
    }
}

export default ShippedOrdersPage;

