import { useState, useEffect } from 'react';
import * as network from '../Network.js';
import * as stack from "../Stack.js";
import * as tokenStore from "../TokenStore.js";

function ProductsPage(props) {

    const [products, setProducts] = useState(null);

    const [error, setError]     = useState(null);

    /* Asynchronous data loading */

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

    /* GUI Event handlers */   

    function onClickShowProduct(ev) {
        const productId = ev.currentTarget.dataset.id;
        stack.go({name:"ProductPage", data:productId});
    }

    function onClickAddProduct(ev) {
        stack.go({name:"AddProductPage", data:null});
    }

    function onClickGoBack(ev) {
        stack.goBack();
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
    else if (products === null) {
        return (
             <p>Loading</p>
        );

    }
    else {

        const rows = products.map(product => 
            <tr data-id={product.id} key={product.id} onClick={onClickShowProduct}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
            </tr>
        );

        return (
            <div className='body'>
                <h3>Productos</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Descripción</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
                <div>
                    
                    <p onClick={onClickAddProduct} className='enlace'>Crear producto</p>
                </div>
            </div>
        );

    }
}

export default ProductsPage;

