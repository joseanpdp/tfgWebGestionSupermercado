import { useState, useEffect } from 'react';
import * as network from '../Network.js';
import * as stack from "../Stack.js";
import * as tokenStore from "../TokenStore.js";

function OrderDetailPage(props) {

    const orderDetailId = props.orderDetailId;

    const [orderDetail, setOrderDetail] = useState(null);

    const [error, setError]             = useState(null);

    /* Asynchronous data loading */

    async function asyncAction() {
      try {
        const orderDetail = await network.getOrderDetail(orderDetailId);
        setOrderDetail(orderDetail);
        console.log(orderDetail);
      }
      catch (err) {
        setError(err);
      }
    }

    function setupEffect() {
      asyncAction();
      // return cleanupFunction;
    }

    useEffect(setupEffect,[]);  

    /* GUI Event handlers */

    function onClickEditOrderDetail(ev) {
      stack.go({name:"EditOrderDetailPage", data: orderDetail});
    }

    async function onClickDeleteOrderDetail(ev) {
      stack.go({name:"DeleteOrderDetailPage", data:orderDetail});
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
    else if (orderDetail === null) {

        return (
             <p>Loading</p>
        );

    }
    else {

        return (
          <>
          <header><h1>Ficha del detalle del pedido</h1></header>
          <main className="info-tabla-menu">
              <div>
                  <div><p>Id:</p><p>{orderDetail.id}</p></div>
                  <div><p>Id del pedido:</p><p>{orderDetail.orderId}</p></div>
                  <div><p>Producto:</p><p>{orderDetail.productName}</p></div>
                  <div><p>Cantidad:</p><p>{orderDetail.quantity}</p></div>
                  <div><p>Importe del detalle:</p><p>{(orderDetail.quantity * orderDetail.productPrice).toFixed(2)}€</p></div>
              </div>
              <ul>
                  <li onClick={onClickEditOrderDetail} className='enlace'>Editar detalle</li>
                  <li onClick={onClickDeleteOrderDetail} className='enlace'>Eliminar detalle</li>
              </ul>
          </main>
      </>
        );

    }
}

export default OrderDetailPage;
