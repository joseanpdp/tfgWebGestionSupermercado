import { useState, useEffect } from 'react';
import * as network from '../Network.js';
import * as stack from "../Stack.js";
import * as tokenStore from "../TokenStore.js";

function CategoriesPage(props) {

    const [categories, setCategories] = useState(null);

    const [error, setError]     = useState(null);

    /* Asynchronous data loading */

    async function asyncAction() {
      try {
        const categories = await network.getCategories();
        setCategories(categories);
      }
      catch (err) {
        setError(err);
      }
    }

    function setupEffect() { // Ver nota al final
      asyncAction();
    }

    useEffect(setupEffect,[]);

    /* GUI Event handlers */   

    function onClickShowCategory(ev) {

        const categoryId = ev.currentTarget.dataset.id;
        stack.go({name:"CategoryPage", data:categoryId});
    }

    function onClickAddCategory(ev) {
        stack.go({name:"AddCategoryPage", data:null});
    }

    function onClickGoBack(ev) {
        stack.goBack();
    }


    if (error !== null) {

        return (
            <>
                <main>
                    <p>Error: {error.message}</p>
                    
                </main>
            </>
        );

    }
    else if (categories === null) {

        return (
             <p>Loading</p>
        );

    }
    else {
        const rows = categories.map(category => 
            <div data-id={category.id} key={category.id} onClick={onClickShowCategory}>
                <div>
                    <p>Id</p><p>{category.id}</p>
                </div>
                <div>
                    <p>Nombre</p><p>{category.name}</p>
                </div>
                <div>
                   <p>Descripción</p><p>{category.description}</p>
                </div>
            </div>
        );

        return (
            <>
                <header><h1>Categorías</h1></header>
                <main className="tabla-menu">
                    <div className="table">
                        <div>
                            <div>Id</div>
                            <div>Nombre</div>
                            <div>Descripción</div>
                        </div>
                        {rows}
                    </div>
                    <ul>
                        <li onClick={onClickAddCategory} className='enlace'>Crear categoría</li>
                    </ul>
                </main>
            </>
        );
    }
}

export default CategoriesPage;

