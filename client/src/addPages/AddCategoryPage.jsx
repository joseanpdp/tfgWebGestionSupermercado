import { useState, useEffect } from 'react';
import * as network from '../Network.js';
import * as stack from "../Stack.js";
import * as tokenStore from "../TokenStore.js";
import * as tools from "../Tools.js";

function AddCategoryPage() {

    const [name, setName]                 = useState("");
    const [description, setDescription]   = useState("");
    const [error, setError]               = useState(null);

    function handleChangeName(event) {
        setName(event.target.value.trim());
    }

    function handleChangeDescription(event) {
        setDescription(event.target.value.trim());
    }

    function onClickGoBack(ev) {
        stack.goBack();
    }

    async function handleSubmit(ev) {
        ev.preventDefault();
        try {
            if ( tools.isEmptyString(name) )                 
                throw new Error("Debe indicar el nombre de la nueva categoría");
            await network.postCategory({ name:name, description:description});
            stack.goBack();
        }
        catch (err) {
            setError(err);
        }
    }

    /* Conditional rendering */

    return (
        <>
            <header><h1>Alta de nueva categoría</h1></header>
            <main className="one">    
                <p className="mensaje">{ error === null ? <>&nbsp;</> : error.message }</p>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Nombre</label>
                        <input type="text" value={name} onChange={handleChangeName}/>
                    </div>
                    <div>
                        <label>Descripción</label>
                        <input type="text" value={description} onChange={handleChangeDescription}/>
                    </div>
                    <input type="submit" value="Añadir"/>
                </form>
            </main>
        </>
    );
}

export default AddCategoryPage;

