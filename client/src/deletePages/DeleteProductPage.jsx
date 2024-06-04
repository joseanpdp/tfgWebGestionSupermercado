import { useState, useEffect } from 'react';
import * as network from '../Network.js';
import * as stack from "../Stack.js";
import * as tokenStore from "../TokenStore.js";

function DeleteProductPage(props) {

    const product = props.product;

    const [error, setError] = useState(null);

    function onClickGoBack(ev) {
        stack.goBack();
    }

    async function handleSubmit(ev) {
        ev.preventDefault();
        try {
            await network.deleteProduct(productId);
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
                <h3>Eliminando producto</h3>
                <form onSubmit={handleSubmit}>
                    <p><b>Id</b>:{product.id}</p>
                    <p><b>Nombre</b>: {product.name}</p>
                    <p><b>Descripción</b>: {product.description}</p>
                    <p><b>Precio</b>: {product.price}</p>
                    <button type="submit">Eliminar</button>
                </form>
                
            </div>
        );

    }
}

export default DeleteProductPage;
