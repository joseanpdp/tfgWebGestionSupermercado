import { useState, useEffect } from 'react';
import * as network from '../Network.js';
import * as stack from "../Stack.js";
import * as tokenStore from "../TokenStore.js";
import * as tools from "../Tools.js";

function EditOrderDetailPage(props) {

    const orderDetail = props.orderDetail;
console.log("EditOrderDetailPage",orderDetail);
    const [quantity, setQuantity]  = useState(orderDetail.quantity);
    const [productId, setProductId]   = useState(orderDetail.productId);

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
            if ( tools.isEmptyString(quantity) )                 
                throw new Error("Debe indicar la cantidad del producto");
            if ( ! tools.isPositiveIntegerString(quantity) )
                throw new Error("Debe indicar la cantidad del producto del detalle");

            const product = await network.getProduct(productId);

            let available = product.quantity + orderDetail.quantity;

            if (quantity > available) 
                throw new Error("Está solicitando demasiadas unidades del producto (máximo " +  product.quantity + ")");

            available -= quantity;
            product.quantity = available;

            await network.putOrderDetail( { quantity:quantity, productId:productId, 
                                            orderId:orderDetail.orderId },
                                            orderDetail.id);

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
                <header><h1>Editar detalle</h1></header>
                <main className="one">    
                    <p className="mensaje">{ error === null ? <>&nbsp;</> : error.message }</p>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Pedido</label>
                            <input type="text" value={orderDetail.orderId} disabled/>
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

export default EditOrderDetailPage;

