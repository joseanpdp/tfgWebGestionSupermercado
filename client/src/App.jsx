import { useState } from 'react'

import './index.css';

import * as tokenStore from "./TokenStore.js";

import * as stack from "./Stack.js";

import Nav from "./Nav.jsx";
import Footer from "./Footer.jsx";

import LoginPage from './LoginPage';

import InitialPage from './InitialPage';

import CustomersPage from './getAllPages/CustomersPage';
import OrdersPage from './getAllPages/OrdersPage';
import PendingOrdersPage from './getAllPages/PendingOrdersPage';
import ShippedOrdersPage from './getAllPages/ShippedOrdersPage';
import DeliveredOrdersPage from './getAllPages/DeliveredOrdersPage';
import ProductsPage from './getAllPages/ProductsPage';
import CategoriesPage from './getAllPages/CategoriesPage';

import CustomerPage from './getPages/CustomerPage';
import OrderPage from './getPages/OrderPage';
import ProductPage from './getPages/ProductPage';
import CategoryPage from './getPages/CategoryPage';
import OrderDetailPage from './getPages/OrderDetailPage';

import AddCustomerPage from './addPages/AddCustomerPage';
import AddProductPage from './addPages/AddProductPage';
import AddOrderPage from './addPages/AddOrderPage';
import AddCategoryPage from './addPages/AddCategoryPage';
import AddOrderDetailPage from './addPages/AddOrderDetailPage';

import DeleteCustomerPage from './deletePages/DeleteCustomerPage';
import DeleteOrderPage from './deletePages/DeleteOrderPage';
import DeleteProductPage from './deletePages/DeleteProductPage';
import DeleteCategoryPage from './deletePages/DeleteCategoryPage';
import DeleteOrderDetailPage from './deletePages/DeleteOrderDetailPage';

import EditCustomerPage from './editPages/EditCustomerPage';
import EditOrderPage from './editPages/EditOrderPage';
import EditProductPage from './editPages/EditProductPage';
import EditCategoryPage from './editPages/EditCategoryPage';
import EditOrderDetailPage from './editPages/EditOrderDetailPage';

stack.push({name:"InitialPage",data:null});


function getContent(page) {

    switch(page.name) {

        case "LoginPage":             return <LoginPage/>;
        case "InitialPage":           return <InitialPage />

        case "CustomersPage":         return <CustomersPage/>
        case "OrdersPage":            return <OrdersPage/>
        case "PendingOrdersPage":     return <PendingOrdersPage/>
        case "ShippedOrdersPage":     return <ShippedOrdersPage/>
        case "DeliveredOrdersPage":   return <DeliveredOrdersPage/>
        case "ProductsPage":          return <ProductsPage/>
        case "CategoriesPage":        return <CategoriesPage/>

        case "CustomerPage":          return <CustomerPage          customerId={page.data}/>
        case "OrderPage":             return <OrderPage             orderId={page.data}/>
        case "ProductPage":           return <ProductPage           productId={page.data}/>
        case "CategoryPage":          return <CategoryPage          categoryId={page.data}/>
        case "OrderDetailPage":       return <OrderDetailPage       orderDetailId={page.data}/>

        case "AddCustomerPage":       return <AddCustomerPage/>;
        case "AddCategoryPage":       return <AddCategoryPage/>;

        case "AddProductPage":        return <AddProductPage        category    ={page.data}/>;
        case "AddOrderPage":          return <AddOrderPage          customer    ={page.data}/>;
        case "AddOrderDetailPage":    return <AddOrderDetailPage    order       ={page.data}/>;

        case "DeleteCustomerPage":    return <DeleteCustomerPage    customer    ={page.data}/>;
        case "DeleteOrderPage":       return <DeleteOrderPage       order       ={page.data}/>;
        case "DeleteProductPage":     return <DeleteProductPage     product     ={page.data}/>;
        case "DeleteCategoryPage":    return <DeleteCategoryPage    category    ={page.data}/>;
        case "DeleteOrderDetailPage": return <DeleteOrderDetailPage orderDetail ={page.data}/>;

        case "EditCustomerPage":      return <EditCustomerPage      customer    ={page.data}/>;
        case "EditCategoryPage":      return <EditCategoryPage      category    ={page.data}/>;
        case "EditOrderPage":         return <EditOrderPage         order       ={page.data}/>;
        case "EditProductPage":       return <EditProductPage       product     ={page.data} />;
        case "EditOrderDetailPage":   return <EditOrderDetailPage   orderDetail ={page.data}/>;

        default: return "No existe " + name;
    }
}

function App() {

    const [page, setPage] = useState({name:"LoginPage", data:null});
    stack.setCallback(setPage);

    let nav = "";
    if (page.name !== "LoginPage") {
        nav = <Nav/>;
    }

    return (
        <>
            {nav}
            {getContent(page)}
            <Footer/>
        </>
    );

}

export default App
