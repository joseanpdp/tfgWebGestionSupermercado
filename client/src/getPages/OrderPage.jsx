import { useState, useEffect } from 'react';
import * as network from '../Network.js';
import * as stack from "../Stack.js";
import * as tokenStore from "../TokenStore.js";

function OrderPage(props) {

    const orderId = props.orderId;

    const [order, setOrder] = useState(null);
    const [error, setError]   = useState(null);

    /* Asynchronous data loading */

    async function asyncAction() {
      try {
        const order = await network.getOrder(orderId);
        setOrder(order);
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

    async function onClickDeleteOrder(ev) {
        stack.go({name:"DeleteOrderPage", data:order});
    }

    function onClickShowOrderDetail(ev) {
        const orderDetailId = ev.currentTarget.dataset.id;
        stack.go({name:"OrderDetailPage", data:orderDetailId});
    }

    function onClickAddOrderDetail(ev) {
        stack.go({name:"AddOrderDetailPage", data:order});
    }

    function onClickEditOrder(ev) {
      stack.go({name:"EditOrderPage", data:order});
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
    else if (order === null) {
        return (
             <p>Loading</p>
        );

    }
    else {

        let totalPrice = 0;
        order.orderDetails.forEach(orderDetail => {
            totalPrice += orderDetail.productPrice * orderDetail.quantity;
          }
        );

        const rows = order.orderDetails.map(orderDetail => 
          <div data-id={orderDetail.id} key={orderDetail.id} onClick={onClickShowOrderDetail}>
              <div>
                  <p>Id</p><p>{orderDetail.id}</p>
              </div>
              <div>
                  <p>Producto</p><p>{orderDetail.productName}</p>
              </div>
              <div>
                  <p>Cantidad</p><p>{orderDetail.quantity}</p>
              </div>
              <div>
                  <p>Importe</p><p>{(orderDetail.quantity * orderDetail.productPrice).toFixed(2)}€</p>
              </div>
          </div>
      );
      return (
          <>
              <header><h1>Ficha del pedido</h1></header>
              <main className="info-tabla-menu">
                  <div>
                      <div><p>Id:</p><p>{order.id}</p></div>
                      <div><p>Cliente:</p><p>{order.customerName} {order.customerSurname}</p></div>
                      <div><p>Estado:</p><p>{order.status}</p></div>
                      <div><p>Importe total:</p><p>{totalPrice.toFixed(2)}€</p></div>
                      <div><p>Fecha:</p><p>{order.date}</p></div>
                      <div><p>Dirección de envío:</p><p>{order.shipAddress}</p></div>
                  </div>
                  <div>
                      <h2>Detalles</h2>
                      <div className="table">
                          <div>
                              <div>Id</div>
                              <div>Producto</div>
                              <div>Cantidad</div>
                              <div>Importe</div>
                          </div>
                          {rows}
                      </div>
                  </div>
                  <ul>
                      <li onClick={onClickAddOrderDetail} className='enlace'>Crear detalle</li>
                      <li onClick={onClickEditOrder} className='enlace'>Editar pedido</li>
                      <li onClick={onClickDeleteOrder} className='enlace'>Eliminar pedido</li>
                  </ul>
              </main>
          </>
      );

    }
}

export default OrderPage;
