import { useState, useEffect } from 'react';
import * as network from '../Network.js';
import * as stack from "../Stack.js";
import * as tokenStore from "../TokenStore.js";
import * as tools from "../Tools.js";

function EditCustomerPage(props) {

    const customer = props.customer;

    const [name, setName]       = useState(customer.name);
    const [surname, setSurname] = useState(customer.surname);
    const [address, setAddress] = useState(customer.address);

    const [error, setError]     = useState(null);

    function handleChangeName(event) {
        setName(event.target.value);
    }

    function handleChangeSurname(event) {
        setSurname(event.target.value);
    }

    function handleChangeAddress(event) {
        setAddress(event.target.value);
    }

    function onClickGoBack(ev) {
        stack.goBack();
    }

    async function handleSubmit(ev) {
        ev.preventDefault();
        try {
            if ( tools.isEmptyString(name) )    throw new Error("Debe indicar el nombre del cliente");
            if ( tools.isEmptyString(surname) ) throw new Error("Debe indicar el apellido del cliente");
            if ( tools.isEmptyString(address) ) throw new Error("Debe indicar la dirección del cliente");

            await network.putCustomer({ name:name, surname:surname, address:address }, customer.id);
            stack.goBack();
        }
        catch (err) {
            setError(err);
        }
    }

    /* Conditional rendering */


    return (
        <>
            <header><h1>Editar cliente</h1></header>
            <main className="one">    
                <p className="mensaje">{ error === null ? <>&nbsp;</> : error.message }</p>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Nombre</label>
                        <input type="text" value={name} onChange={handleChangeName}/>
                    </div>
                    <div>
                        <label>Apellidos</label>
                        <input type="text" value={surname} onChange={handleChangeSurname}/>
                    </div>
                    <div>
                        <label>Dirección</label>
                        <input type="text" value={address} onChange={handleChangeAddress}/>
                    </div>
                    <input type="submit" value="Añadir"/>
                </form>
            </main>
        </>
    );


}

export default EditCustomerPage;
