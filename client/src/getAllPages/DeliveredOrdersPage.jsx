import { useState, useEffect } from 'react';
import * as network from '../Network.js';
import * as stack from "../Stack.js";
import * as tokenStore from "../TokenStore.js";

function DeliveredOrdersPage(props) {
    const [deliveredOrders, setDeliveredOrders] = useState(null);
    const [error, setError]   = useState(null);
    let rowsDelivered;

    /* Asynchronous data loading */

    async function asyncAction() {
        try {
            const deliveredOrders = await network.getOrdersByStatus("DELIVERED");
            setDeliveredOrders(deliveredOrders);
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
    else if (deliveredOrders === null) {
        return (
            <p>Loading</p>
        );
    }
    else {
        if (deliveredOrders != null) {
            rowsDelivered = deliveredOrders.map(order => 
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
                        {rowsDelivered}
                    </div>
                </main>
            </>
        );
    }
}

export default DeliveredOrdersPage;

