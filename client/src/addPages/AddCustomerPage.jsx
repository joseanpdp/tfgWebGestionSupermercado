import { useState, useEffect } from 'react';
import * as network from '../Network.js';
import * as stack from "../Stack.js";
import * as tokenStore from "../TokenStore.js";
import * as tools from "../Tools.js";

function AddCustomerPage() {

    const [name, setName]       = useState("");
    const [surname, setSurname] = useState("");
    const [address, setAddress] = useState("");

    const [error, setError]     = useState(null);

    function handleChangeName(event) {
        setName(event.target.value.trim());
    }

    function handleChangeSurname(event) {
        setSurname(event.target.value.trim());
    }

    function handleChangeAddress(event) {
        setAddress(event.target.value.trim());
    }

    async function handleSubmit(ev) {
        ev.preventDefault();
        try {

            if ( tools.isEmptyString(name) )    throw new Error("Debe indicar el nombre del nuevo cliente");
            if ( tools.isEmptyString(surname) ) throw new Error("Debe indicar el apellido del nuevo cliente");
            if ( tools.isEmptyString(address) ) throw new Error("Debe indicar la dirección del nuevo cliente");

            await network.postCustomer({ name:name, surname:surname, address:address });
            stack.goBack();
        }
        catch (err) {
            setError(err);
        }
    }

    /* Conditional rendering */

    return (
            <>
                <header><h1>Alta de nuevo cliente</h1></header>
                <main className="formulario">    
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

export default AddCustomerPage;
