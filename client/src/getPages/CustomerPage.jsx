import { useState, useEffect } from 'react';
import * as stack from "../Stack.js";
import * as network from '../Network.js';
import * as tokenStore from "../TokenStore.js";

function CustomerPage(props) {

    const customerId = props.customerId;

    const [customer, setCustomer] = useState(null);

    const [error, setError]   = useState(null);

    /* Asynchronous data loading */

    async function asyncAction() {
      try {
        const customer = await network.getCustomer(customerId);
        setCustomer(customer);
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

    function onClickAddOrder(ev) {
        stack.go({name:"AddOrderPage", data:customer});
    }

    function onClickEditCustomer(ev) {
        stack.go({name:"EditCustomerPage", data:customer});
    }

    function onClickDeleteCustomer(ev) {
        stack.go({name:"DeleteCustomerPage", data:customer});
    }

    function onClickGoBack(ev) {
        stack.goBack();
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
    else if (customer === null) {

        return (
             <p>Loading</p>
        );

    }
    else if (customer !== null) {

        const rows = customer.orders.map(order => 
            <div data-id={order.id} key={order.id} onClick={onClickShowOrder}>
                <div>
                    <p>Id</p><p>{order.id}</p>
                </div>
                <div>
                    <p>Fecha</p><p>{order.date}</p>
                </div>
                <div>
                    <p>Dirección</p><p>{order.shipAddress}</p>
                </div>
                <div>
                    <p>Estado</p><p>{order.status}</p>
                </div>
            </div>
        );

        return (

            <>
                <header><h1>Ficha del cliente</h1></header>
                <main className="info-tabla-menu">
                    <div>
                        <div><p>Id:</p><p>{customer.id}</p></div>
                        <div><p>Nombre:</p><p>{customer.name} {customer.surname}</p></div>
                        <div><p>Dirección:</p><p>{customer.address}</p></div>
                    </div>
                    <div>
                        <h2>Pedidos</h2>
                        <div className="table">
                            <div>
                                <div>Id</div>
                                <div>Fecha</div>
                                <div>Dirección de envío</div>
                                <div>Estado</div>
                            </div>
                            {rows}
                        </div>
                    </div>
                    <ul>
                        <li onClick={onClickAddOrder} className='enlace'>Crear pedido</li>
                        <li onClick={onClickEditCustomer} className='enlace'>Editar cliente</li>
                        <li onClick={onClickDeleteCustomer} className='enlace'>Eliminar cliente</li>
                    </ul>
                </main>
            </>
        );

    }
    else {
        return null;
    }
}

export default CustomerPage;

