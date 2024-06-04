import { useState, useEffect } from 'react';
import * as network from '../Network.js';
import * as stack from "../Stack.js";
import * as tokenStore from "../TokenStore.js";

function CustomersPage() {

    const [customers, setCustomers] = useState(null);

    const [error, setError]     = useState(null);

    /* Asynchronous data loading */

    async function asyncAction() {
      try {
        const customers = await network.getCustomers();
        setCustomers(customers);
      }
      catch (err) {
        setError(err);
      }
    }

    function setupEffect() { // Ver nota al final
      asyncAction();
    }

    useEffect(setupEffect,[]);

    /* GUI Event handlers */

    function onClickShowCustomer(ev) {
        const customerId = ev.currentTarget.dataset.id;
        stack.go({name:"CustomerPage", data:customerId});
    }

    function onClickAddCustomer(ev) {
        stack.go({name:"AddCustomerPage", data:null});
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
    else if (customers === null) {

        return (
             <p>Loading</p>
        );

    }
    else {

        const rows = customers.map(customer => 
            <div data-id={customer.id} key={customer.id} onClick={onClickShowCustomer}>
                <div>
                    <p>Id</p><p>{customer.id}</p>
                </div>
                <div>
                    <p>Nombre</p><p>{customer.name} {customer.surname}</p>
                </div>
                <div>
                   <p>Dirección</p><p>{customer.address}</p>
                </div>
            </div>
        );

        return (
            <>
                <header><h1>Clientes</h1></header>
                <main className="tabla-menu">
                    <div className="table">
                        <div>
                            <div>Id</div>
                            <div>Nombre</div>
                            <div>Dirección</div>
                        </div>
                        {rows}
                    </div>
                    <ul>
                        <li onClick={onClickAddCustomer} className='enlace'>Crear cliente</li>
                    </ul>
                </main>
            </>
        );

    }
}

export default CustomersPage;
