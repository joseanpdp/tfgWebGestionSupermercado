import { useState, useEffect } from 'react';
import * as network from '../Network.js';
import * as stack from "../Stack.js";
import * as tokenStore from "../TokenStore.js";
import * as tools from "../Tools.js";

function EditOrderPage(props) {

    const order = props.order;

    const [date, setDate]               = useState(order.date);
    const [shipAddress, setShipAddress] = useState(order.shipAddress);
    const [status, setStatus]           = useState(order.status);

    const [error, setError]             = useState(null);

    function handleChangeDate(event) {
        setDate(event.target.value);
    }

    function handleChangeShipAddress(event) {
        setShipAddress(event.target.value);
    }

    function handleChangeStatus(event) {
        setStatus(event.target.value);
    }

    function onClickGoBack(ev) {
        stack.goBack();
    }

    async function handleSubmit(ev) {
        ev.preventDefault();
        try {
            if ( tools.isEmptyString(shipAddress) )                 
                throw new Error("Debe indicar la dirección de envío del pedido");
            await network.putOrder( { date:date, shipAddress:shipAddress, status:status,
                                      customerId: order.customerId }, 
                                      order.id);
            stack.goBack();
        }
        catch (err) {
            setError(err);
        }
    }

    /* Conditional rendering */

    const states = ["PENDING", "SHIPPED", "DELIVERED"];
    let selectedStateIndex = states.indexOf(order.status);
    let actualStates = states.slice(selectedStateIndex);
    const options = actualStates.map(state => {
            return <option value={state}>{state}</option>
        }
    );

    return (
        <>
            <header><h1>Editar pedido</h1></header>
            <main className="one">    
                <p className="mensaje">{ error === null ? <>&nbsp;</> : error.message }</p>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Cliente</label>
                        <input type="text" value={order.customerName + " " + order.customerSurname} disabled/>
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

export default EditOrderPage;
