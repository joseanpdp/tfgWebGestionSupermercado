import * as stack from "./Stack.js";
import * as tokenStore from "./TokenStore.js";


function InitialPage(props) {

    function onClickCustomersPage(ev) {
        stack.clearStack();
        stack.push({name:"InitialPage", data:null});
        stack.go({name:"CustomersPage", data:null});
    }

    function onClickOrdersPage(ev) {
        stack.clearStack();
        stack.push({name:"InitialPage", data:null});
        stack.go({name:"OrdersPage", data:null});
    }

    function onClickCategoriesPage(ev) {
        stack.clearStack();
        stack.push({name:"InitialPage", data:null});
        stack.go({name:"CategoriesPage", data:null});
    }

    return (
        <main className="menu">
            <ul>
                <li className="enlace" onClick={onClickCustomersPage}>Clientes</li>
                <li className="enlace" onClick={onClickOrdersPage}>Pedidos</li>
                <li className="enlace" onClick={onClickCategoriesPage}>Categorías</li>
            </ul>
        </main>        
    );
}
export default InitialPage;
