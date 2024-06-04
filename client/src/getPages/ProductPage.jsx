import { useState, useEffect } from 'react';
import * as network from '../Network.js';
import * as stack from "../Stack.js";
import * as tokenStore from "../TokenStore.js";

function ProductPage(props) {

    const productId = props.productId;

    const [product, setProduct] = useState(null);

    const [error, setError]   = useState(null);

    /* Asynchronous data loading */

    async function asyncAction() {
      try {
        const product = await network.getProduct(productId);
        setProduct(product);
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

    function onClickEditProduct(ev) {
      const data = { id:product.id, 
        categoryId:product.categoryId,
        name:product.name,
        description:product.description,
        price:product.price,
        quantity:product.quantity}
      stack.go({name:"EditProductPage", data:data});
    }

    async function onClickDeleteProduct(ev) {
      const data = { id:product.id, 
        name:product.name,
        description:product.description,
        price:product.price,
        quantity:product.quantity}
      stack.go({name:"DeleteProductPage", data:data});
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
    else if (product === null) {

        return (
             <p>Loading</p>
        );

    }
    else if (product !== null) {

        return (
          <>
          <header><h1>Ficha del producto</h1></header>
          <main className="info-tabla-menu">
              <div>
                  <div><p>Id:</p><p>{product.id}</p></div>
                  <div><p>Nombre:</p><p>{product.name}</p></div>
                  <div><p>Descripción:</p><p>{product.description}</p></div>
                  <div><p>Precio:</p><p>{product.price.toFixed(2)}€</p></div>
                  <div><p>Cantidad:</p><p>{product.quantity}</p></div>
              </div>
              <ul>
                  <li onClick={onClickEditProduct} className='enlace'>Editar producto</li>
                  <li onClick={onClickDeleteProduct} className='enlace'>Eliminar producto</li>
              </ul>
          </main>
      </>
        );

    }
    else {
        return null;
    }

}

export default ProductPage;

