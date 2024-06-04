import { useState, useEffect } from 'react';
import * as network from '../Network.js';
import * as stack from "../Stack.js";
import AllOrdersPage from './AllOrdersPage.jsx';
import PendingOrdersPage from './PendingOrdersPage.jsx';
import ShippedOrdersPage from './ShippedOrdersPage.jsx';
import DeliveredOrdersPage from './DeliveredOrdersPage.jsx';
import * as tokenStore from "../TokenStore.js";

function OrdersPage(props) {
    const [error, setError]   = useState(null);
    const [currentPage, setCurrentPage] = useState('ALL');
    const [selectedButton, setSelectedButton] = useState('ALL');

    function onClickShowAllOrdersPage(ev) {
        setCurrentPage('ALL');
        setSelectedButton('ALL');
    }

    function onClickShowPendingOrdersPage(ev) {
        setCurrentPage('PENDING');
        setSelectedButton('PENDING');
    }

    function onClickShowShippedOrdersPage(ev) {
        setCurrentPage('SHIPPED');
        setSelectedButton('SHIPPED');
    }

    function onClickShowDeliveredOrdersPage(ev) {
        setCurrentPage('DELIVERED');
        setSelectedButton('DELIVERED');
    }

    function onClickGoBack(ev) {
        stack.goBack();
    }

    let orders;
    if (currentPage === 'ALL') {
        orders = <AllOrdersPage/>
    }
    else if (currentPage === 'PENDING') {
        orders = <PendingOrdersPage/>;
    }
    else if (currentPage === 'SHIPPED') {
        orders = <ShippedOrdersPage/>;
    }
    else if (currentPage === 'DELIVERED') {
        orders = <DeliveredOrdersPage/>;
    }


    /* Conditional rendering */

    if (error !== null) {
        return (
            <>
                <p>Error: {error.message}</p>
                
            </>
        );
    }
    else {
        return (
            <>
                <header><h1>Pedidos</h1>
                    <nav className='statusFilter'>
                        <ul>
                            <li className={`enlace ${selectedButton === 'ALL' ? 'selected' : ''}`} onClick={onClickShowAllOrdersPage}>Todos</li>
                            <li className={`enlace ${selectedButton === 'PENDING' ? 'selected' : ''}`} onClick={onClickShowPendingOrdersPage}>Pendientes</li>
                            <li className={`enlace ${selectedButton === 'SHIPPED' ? 'selected' : ''}`} onClick={onClickShowShippedOrdersPage}>Enviados</li>
                            <li className={`enlace ${selectedButton === 'DELIVERED' ? 'selected' : ''}`} onClick={onClickShowDeliveredOrdersPage}>Entregados</li>
                        </ul>
                    </nav>
                </header>
                <main className='tabla-menu'>
                    {orders}
                </main>
            
            </>
        );
    }
}

export default OrdersPage;

