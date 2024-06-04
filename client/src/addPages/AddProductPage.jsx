import { useState, useEffect } from 'react';
import * as network from '../Network.js';
import * as stack from "../Stack.js";
import * as tokenStore from "../TokenStore.js";
import * as tools from "../Tools.js";

function AddProductPage(props) {

    const category = props.category;

    const [name, setName]                 = useState("");
    const [price, setPrice]               = useState("");
    const [quantity, setQuantity]         = useState("");
    const [description, setDescription]   = useState("");

    const [error, setError]               = useState(null);

    function handleChangeName(event) {
        setName(event.target.value.trim());
    }

    function handleChangeDescription(event) {
        setDescription(event.target.value.trim());
    }

    function handleChangePrice(event) {
        setPrice(event.target.value.trim());
    }

    function handleChangeQuantity(event) {
        setQuantity(event.target.value.trim());
    }

    function onClickGoBack(ev) {
        stack.goBack();
    }

    async function handleSubmit(ev) {
        ev.preventDefault();
        try {

            if ( tools.isEmptyString(name) )                 
                throw new Error("Debe indicar el nombre del nuevo producto");
            if ( ! tools.isPositiveNumberString(price) )
                throw new Error("Debe indicar el precio del nuevo producto como número positivo");
            if ( ! tools.isPositiveIntegerString(quantity) )
                throw new Error("Debe indicar el número de unidades disponibles como número entero positivo");

            await network.postProduct({ name:name, description:description, price:price, quantity:quantity,
                                        categoryId: category.id});
            stack.goBack();
        }
        catch (err) {
            setError(err);
        }
    }

    /* Conditional rendering */

    return (
        <>
            <header><h1>Alta de nuevo producto</h1></header>
            <main className="one">    
                <p className="mensaje">{ error === null ? <>&nbsp;</> : error.message }</p>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Nombre</label>
                        <input type="text" value={name} onChange={handleChangeName}/>
                    </div>
                    <div>
                        <label>Precio</label>
                        <input type="text" value={price} onChange={handleChangePrice}/>
                    </div>
                    <div>
                        <label>Cantidad</label>
                        <input type="text" value={quantity} onChange={handleChangeQuantity}/>
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

export default AddProductPage;

