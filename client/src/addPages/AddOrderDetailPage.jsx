import { useState, useEffect } from 'react';
import * as network from '../Network.js';
import * as stack from "../Stack.js";
import * as tokenStore from "../TokenStore.js";
import * as tools from "../Tools.js";

function AddOrderDetailPage(props) {

    const order = props.order;

    const [quantity, setQuantity]   = useState(1);
    const [productId, setProductId] = useState(1);

    const [products, setProducts]   = useState(null);

    const [error, setError]         = useState(null);

    async function asyncAction() {
        try {
            const products = await network.getProducts();
            setProducts(products);
        }
        catch (err) {
            setError(err);
        }
    }

    function setupEffect() {
        asyncAction();
    }
  
    useEffect(setupEffect,[]);  

    function handleChangeQuantity(event) {
        setQuantity(event.target.value);
    }

    function handleChangeProductId(event) {
        setProductId(event.target.value);
    }

    function onClickGoBack(ev) {
        stack.goBack();
    }

    async function handleSubmit(ev) {
        ev.preventDefault();
        try {
            if ( ! tools.isPositiveIntegerString(quantity) )
                throw new Error("Debe indicar la cantidad del producto del nuevo detalle");

            const product = await network.getProduct(productId);


            if (quantity > product.quantity) 
                throw new Error("Está solicitando demasiadas unidades del producto (máximo " +  product.quantity + ")");

            product.quantity -= quantity;

            await network.postOrderDetail({productId:productId, quantity:quantity,
                                           orderId:order.id});

            await network.putProduct({name:product.name, description:product.description, 
                                      price:product.price, categoryId:product.categoryId, 
                                      quantity:product.quantity}, product.id);
            stack.goBack();
        }
        catch (err) {
            setError(err);
        }
    }

    /* Conditional rendering */

    if (products === null) {

        return (
             <p>Loading</p>
        );

    }
    else {

        const options = products.map(product => {
                if (product.quantity > 0) {
                    return <option value={product.id}>{product.name} ({product.quantity})</option>
                }
            }
        );
        return (
            <>
                <header><h1>Alta de nuevo detalle</h1></header>
                <main className="one">    
                    <p className="mensaje">{ error === null ? <>&nbsp;</> : error.message }</p>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Pedido</label>
                            <input type="text" value={order.id} disabled/>
                        </div>
                        <div>
                            <label>Producto</label>
                            <select name="productId" onChange={handleChangeProductId} value={productId}>
                                {options}                            
                            </select>
                        </div>
                        <div>
                            <label>Cantidad</label>
                            <input type="text" value={quantity} onChange={handleChangeQuantity}/>
                        </div>
                        <input type="submit" value="Añadir"/>
                    </form>
                </main>
            </>
        );
    }
}

export default AddOrderDetailPage;

