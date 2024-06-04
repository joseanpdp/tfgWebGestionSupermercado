import { useState, useEffect } from 'react';
import * as network from '../Network.js';
import * as stack from "../Stack.js";
import * as tokenStore from "../TokenStore.js";

function DeleteCategoryPage(props) {

    const category = props.category;

    const [error, setError] = useState(null);
    

    function onClickGoBack(ev) {
        stack.goBack();
    }

    async function handleSubmit(ev) {
        ev.preventDefault();
        try {
            await network.deleteCategory(category.id);
            stack.goBack2();
        }
        catch (err) {
            setError(err);
        }
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
    else {

        return (
            <div className='body'>
                <h3>Eliminando categoría</h3>
                <form onSubmit={handleSubmit}>
                    <p><b>Id</b>:{category.id}</p>
                    <p><b>Nombre</b>: {category.name}</p>
                    <p><b>Descripción</b>: {category.description}</p>
                    <button type="submit">Eliminar</button>
                </form>
                
            </div>
        );

    }
}

export default DeleteCategoryPage;
