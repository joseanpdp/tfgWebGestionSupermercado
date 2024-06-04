import { useState, useEffect } from 'react';
import * as network from '../Network.js';
import * as stack from "../Stack.js";
import * as tokenStore from "../TokenStore.js";
import * as tools from "../Tools.js";

function AddOrderPage(props) {

    const customer = props.customer;

    const [date, setDate]                       = useState(tools.today());
    const [shipAddress, setShipAddress]         = useState(customer.address);
    const [error, setError]                     = useState(null);

    function handleChangeDate(event) {
        setDate(event.target.value);
    }

    function handleChangeShipAddress(event) {
        setShipAddress(event.target.value);
    }

    function onClickGoBack(ev) {
        stack.goBack();
    }

    async function handleSubmit(ev) {
        ev.preventDefault();
        try {
            if ( tools.isEmptyString(shipAddress) )                 
                throw new Error("Debe indicar la dirección de envío del nuevo pedido");
            await network.postOrder({date:date, shipAddress:shipAddress, 
                                     customerId: customer.id});
            stack.goBack();
        }
        catch (err) {
            setError(err);
        }
    }

    /* Conditional rendering */

    return (
        <>
            <header><h1>Alta de nuevo pedido</h1></header>
            <main className="one">    
                <p className="mensaje">{ error === null ? <>&nbsp;</> : error.message }</p>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Cliente</label>
                        <input type="text" value={customer.name + " " + customer.surname} disabled/>
                    </div>
                    <div>
                        <label>Fecha</label>
                        <input type="date" value={date} onChange={handleChangeDate}/>
                    </div>
                    <div>
                        <label>Dirección de envío</label>
                        <input type="text" value={shipAddress} onChange={handleChangeShipAddress}/>
                    </div>
                    <input type="submit" value="Añadir"/>
                </form>
            </main>
        </>
    );
}

export default AddOrderPage;
