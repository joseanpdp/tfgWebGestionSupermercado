import { useState, useEffect } from 'react';
import * as network from '../Network.js';
import * as stack from "../Stack.js";
import * as tokenStore from "../TokenStore.js";
import * as tools from "../Tools.js";

function EditCategoryPage(props) {

    const category = props.category;

    const [name, setName]                 = useState(category.name);
    const [description, setDescription]   = useState(category.description);

    const [error, setError]               = useState(null);

    function handleChangeName(event) {
        setName(event.target.value);
    }

    function handleChangeDescription(event) {
        setDescription(event.target.value);
    }

    function onClickGoBack(ev) {
        stack.goBack();
    }

    async function handleSubmit(ev) {
        ev.preventDefault();
        try {
            if ( tools.isEmptyString(name) )                 
                throw new Error("Debe indicar el nombre de la categoría");
            await network.putCategory({ name:name, description:description},
                                        category.id);
            stack.goBack();
        }
        catch (err) {
            setError(err);
        }
    }

    /* Conditional rendering */
    return (
        <>
            <header><h1>Editar categoría</h1></header>
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

export default EditCategoryPage;

