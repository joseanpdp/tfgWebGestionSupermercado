import { useState, useEffect } from 'react';
import * as network from '../Network.js';
import * as stack from "../Stack.js";
import * as tokenStore from "../TokenStore.js";

function CategoryPage(props) {

    const categoryId = props.categoryId;

    const [category, setCategory] = useState(null);

    const [error, setError]   = useState(null);

    /* Asynchronous data loading */

    async function asyncAction() {
      try {
        const category = await network.getCategory(categoryId);
        setCategory(category);
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

    function onClickEditCategory(ev) {
        stack.go({name:"EditCategoryPage", data:category});
    }

    function onClickDeleteCategory(ev) {
      stack.go({name:"DeleteCategoryPage", data:category});
    }

    function onClickAddProduct(ev) {
        stack.go({name:"AddProductPage", data:category});
    }

    function onClickShowProduct(ev) {
      const productId = ev.currentTarget.dataset.id;
      stack.go({name:"ProductPage", data:productId});
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
    else if (category === null) {

        return (
             <p>Loading</p>
        );

    }
    else if (category !== null) {

        const rows = category.products.map(product => 
          <div data-id={product.id} key={product.id} onClick={onClickShowProduct}>
            <div>
                <p>Id</p><p>{product.id}</p>
            </div>
            <div>
                <p>Nombre</p><p>{product.name}</p>
            </div>
            <div>
                <p>Precio</p><p>{product.price.toFixed(2)}€</p>
            </div>
            <div>
                <p>Cantidad</p><p>{product.quantity}</p>
            </div>
            <div>
                <p>Descripción</p><p>{product.description}</p>
            </div>
          </div>
        );

        return (
          <>
            <header><h1>Ficha de la categoría</h1></header>
            <main className="info-tabla-menu">
                <div>
                    <div><p>Id:</p><p>{category.id}</p></div>
                    <div><p>Nombre:</p><p>{category.name}</p></div>
                    <div><p>Descripción:</p><p>{category.description}</p></div>
                </div>
                <div>
                    <h2>Productos</h2>
                    <div className="table">
                        <div>
                            <div>Id</div>
                            <div>Nombre</div>
                            <div>Precio</div>
                            <div>Cantidad</div>
                            <div>Descripción</div>
                        </div>
                        {rows}
                    </div>
                </div>
                <ul>
                    <li onClick={onClickAddProduct} className='enlace'>Crear producto</li>
                    <li onClick={onClickEditCategory} className='enlace'>Editar categoría</li>
                    <li onClick={onClickDeleteCategory} className='enlace'>Eliminar categoría</li>
                </ul>
            </main>
          </>
        );

    }
    else {
        return null;
    }

}

export default CategoryPage;

