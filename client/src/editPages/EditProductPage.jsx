import { useState, useEffect } from 'react';
import * as network from '../Network.js';
import * as stack from "../Stack.js";
import * as tokenStore from "../TokenStore.js";
import * as tools from "../Tools.js";

function EditProductPage(props) {

    const product = props.product;

    const [name, setName]                 = useState(product.name);
    const [description, setDescription]   = useState(product.description);
    const [price, setPrice]               = useState(product.price);
    const [quantity, setQuantity]         = useState(product.quantity);
    const [error, setError]               = useState(null);

    function handleChangeName(event) {
        
        setName(event.target.value);
        console.log(name)
    }

    function handleChangeDescription(event) {
        
        setDescription(event.target.value);
        console.log(description)
    }

    function handleChangePrice(event) {
        
        setPrice(event.target.value);
        console.log(price)
    }

    function handleChangeQuantity(event) {
        setQuantity(parseInt(event.target.value));
        console.log(quantity)
    }

    function onClickGoBack(ev) {
        stack.goBack();
    }

    async function handleSubmit(ev) {
        ev.preventDefault();
        try {
            if ( tools.isEmptyString(name) )                 
                throw new Error("Debe indicar el nombre del producto");
            if ( ! tools.isPositiveNumberString(price) )
                throw new Error("Debe indicar el precio del producto como número positivo");
            if ( ! tools.isPositiveIntegerString(quantity) )
                throw new Error("Debe indicar el número de unidades disponibles como número entero positivo");
console.log("EditProductPage.handleSubmit",{ name:name, description:description, price:price, quantity:quantity,
                                       categoryId: product.categoryId})
            await network.putProduct({ name:name, description:description, price:price, quantity:quantity,
                                       categoryId: product.categoryId},
                                       product.id);
            stack.goBack();
        }
        catch (err) {
            setError(err);
        }
    }

    /* Conditional rendering */
    return (
        <>
            <header><h1>Editar producto</h1></header>
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

export default EditProductPage;

