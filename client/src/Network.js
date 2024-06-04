import * as tokenStore from "./TokenStore.js";

//////////////////////////////////////////////////////////////////////

async function getAuth(credentials) {
    const fetchConfig = { method: "POST", 
                          headers: {"Content-Type":"application/json", "Sec-Fetch-Site": "cross-site"},
                          mode: "cors",
                          body: JSON.stringify(credentials)};
    const response = await fetch("http://localhost:8080/auth/login",fetchConfig );
    if (!response.ok) {
        throw new Error( "response:" +response.status + " " + response.statusText);
    }
    const token = await response.json();
    tokenStore.setToken(token.token)
}


//////////////////////////////////////////////////////////////////////


async function doGetAll(pathTerminal) {
    const token = tokenStore.getToken();
    const fetchConfig = { method: "GET", 
                          headers: {"Content-Type":"application/json",                                      
                                    "Authorization": "Bearer " + token
                                   }};                                      
    const response = await fetch("http://localhost:8080/" + pathTerminal, fetchConfig);
    if (!response.ok) throw new Error("El token ha expirado, por favor cierre sesión");
    const data = await response.json();
    return data;

}

async function getCustomers() {
    return doGetAll("customer");
}

async function getOrders() {
    const token = tokenStore.getToken();
    const fetchConfig = { method: "GET", 
                          headers: {"Content-Type":"application/json",                                      
                                    "Authorization": "Bearer " + token
                                   }};      
    const responseOrders = await fetch("http://localhost:8080/order", fetchConfig);
    if (!responseOrders.ok) throw new Error("El token ha expirado, por favor cierre sesión");
    const orders = await responseOrders.json();
    return orders;
}

async function getProducts() {
    return doGetAll("product");
}

async function getCategories() {
    return doGetAll("category");
}

///////////////////////////////////////////////////////////////////////

async function getOrdersByStatus(status) {
    const token = tokenStore.getToken();
    const fetchConfig = { method: "GET", 
                          headers: {"Content-Type":"application/json",                                      
                                    "Authorization": "Bearer " + token
                                   }};                                      
    const response = await fetch("http://localhost:8080/order/bystatus/" + status, fetchConfig);
    if (!response.ok) throw new Error("El token ha expirado, por favor cierre sesión");
    const data = await response.json();
    return data;
}

//////////////////////////////////////////////////////////////////////

async function doGetWithSon(fatherPathTerminal, sonPathTerminal, fatherId) {
    const token = tokenStore.getToken();
    const fetchConfig = { method: "GET", 
                          headers: {"Content-Type":"application/json",                                      
                                    "Authorization": "Bearer " + token
                                   }};                                      
    const fatherResponse = await fetch("http://localhost:8080/" + fatherPathTerminal + "/" + fatherId, fetchConfig)
    const fatherData = await fatherResponse.json();
    const sonResponse = await fetch("http://localhost:8080/" + sonPathTerminal + "/" + sonId, fetchConfig)
    const sonData = await sonResponse.json();
    const dataArr = [fatherData, sonData];
    return dataArr;

}

async function getCustomer(customerId) {
    const token = tokenStore.getToken();
    const fetchConfig = { method: "GET", 
                          headers: {"Content-Type":"application/json",                                      
                                    "Authorization": "Bearer " + token
                                   }};      
    const responseCustomer = await fetch("http://localhost:8080/customer/" + customerId, fetchConfig);
    if (!responseCustomer.ok) throw new Error("El token ha expirado, por favor cierre sesión");
    const customer = await responseCustomer.json();
    const respondeOrders = await fetch("http://localhost:8080/order/bycustomer/" + customerId, fetchConfig);
    const orders = await respondeOrders.json();
    customer.orders = orders;
    return customer;
}
  
async function getOrder(orderId) {
    const token = tokenStore.getToken();
    const fetchConfig = { method: "GET", 
                          headers: {"Content-Type":"application/json",                                      
                                    "Authorization": "Bearer " + token
                                   }};      
    const responseOrder = await fetch("http://localhost:8080/order/" + orderId, fetchConfig);
    if (!responseOrder.ok) throw new Error("El token ha expirado, por favor cierre sesión");
    const order = await responseOrder.json();
    const responseOrderDetails = await fetch("http://localhost:8080/orderdetail/byorder/" + orderId, fetchConfig);
    const orderDetails = await responseOrderDetails.json();
    order.orderDetails = orderDetails;
    return order;
}
  
async function getProduct(productId) {
    const token = tokenStore.getToken();
    const fetchConfig = { method: "GET", 
                          headers: {"Content-Type":"application/json",                                      
                                    "Authorization": "Bearer " + token
                                   }};    
    const response = await fetch("http://localhost:8080/product/" + productId, fetchConfig);
    if (!response.ok) throw new Error("El token ha expirado, por favor cierre sesión");
    const json = await response.json();
    return json;
}
  
async function getOrderDetail(orderDetailId) {
    const token = tokenStore.getToken();
    const fetchConfig = { method: "GET", 
                          headers: {"Content-Type":"application/json",                                      
                                    "Authorization": "Bearer " + token
                                   }};    
    const response = await fetch("http://localhost:8080/orderdetail/" + orderDetailId, fetchConfig);
    if (!response.ok) throw new Error("El token ha expirado, por favor cierre sesión");
    const orderDetail = await response.json();
    return orderDetail;
}

async function getCategory(categoryId) {
    const token = tokenStore.getToken();
    const fetchConfig = { method: "GET", 
                          headers: {"Content-Type":"application/json",                                      
                                    "Authorization": "Bearer " + token
                                   }};    
    const responseCategory = await fetch("http://localhost:8080/category/" + categoryId, fetchConfig);
    if (!responseCategory.ok) throw new Error("El token ha expirado, por favor cierre sesión");
    const category = await responseCategory.json();
    const responseProducts = await fetch("http://localhost:8080/product/bycategory/" + categoryId, fetchConfig);
    const products = await responseProducts.json();
    category.products = products;
    return category;
}

////////////////////////////////////////////////////////////////////////////////

async function postCategory(category) {
    const token = tokenStore.getToken();
    const fetchConfig = { method: "POST", 
                          headers: {"Content-Type":"application/json",                                      
                                    "Authorization": "Bearer " + token
                                   },
                          body: JSON.stringify(category)};
    const response = await fetch("http://localhost:8080/category", fetchConfig);
    if (!response.ok) throw new Error("El token ha expirado, por favor cierre sesión");
    const data = await response.json();
    return data;
}

async function postCustomer(customer) {
    const token = tokenStore.getToken();
    const fetchConfig = { method: "POST", 
                          headers: {"Content-Type":"application/json",                                      
                                    "Authorization": "Bearer " + token

                                   },
                          body: JSON.stringify(customer)};
    const response = await fetch("http://localhost:8080/customer", fetchConfig);
    if (!response.ok) throw new Error("El token ha expirado, por favor cierre sesión");
    const data = await response.json();
    return data;
}

async function postOrder(order) {
    const token = tokenStore.getToken();
    const fetchConfig = { method: "POST", 
                          headers: {"Content-Type":"application/json",                                      
                                    "Authorization": "Bearer " + token
                                   },
                          body: JSON.stringify(order)};
    const response = await fetch("http://localhost:8080/order", fetchConfig);
    if (!response.ok) throw new Error("El token ha expirado, por favor cierre sesión");
    const data = await response.json();
    return data;
}

async function postOrderDetail(orderDetail) {
    const token = tokenStore.getToken();
    const fetchConfig = { method: "POST", 
                          headers: {"Content-Type":"application/json",                                      
                                    "Authorization": "Bearer " + token
                                   },
                          body: JSON.stringify(orderDetail)};
    const response = await fetch("http://localhost:8080/orderdetail", fetchConfig);
    if (!response.ok) throw new Error("El token ha expirado, por favor cierre sesión");
    const data = await response.json();
    return data;
}

async function postProduct(product) {
    const token = tokenStore.getToken();
    const fetchConfig = { method: "POST", 
                          headers: {"Content-Type":"application/json",                                      
                                    "Authorization": "Bearer " + token
                                   },
                          body: JSON.stringify(product)};
    const response = await fetch("http://localhost:8080/product", fetchConfig);
    if (!response.ok) throw new Error("El token ha expirado, por favor cierre sesión");
    const data = await response.json();
    return data;
}



//////////////////////////////////////////////////////////////////////////////

async function doDelete(pathTerminal, dataId) {
    const token = tokenStore.getToken();
    const fetchConfig = { method: "DELETE", 
                          headers: {"Content-Type":"application/json",                                      
                                    "Authorization": "Bearer " + token
                                   }};
    const response = await fetch("http://localhost:8080/" + pathTerminal + "/" + dataId, fetchConfig);
    if (!response.ok) throw new Error("El token ha expirado, por favor cierre sesión");
}

async function deleteCustomer(customerId) {
    await doDelete("customer", customerId);
}

async function deleteOrder(orderId) {
    await doDelete("order", orderId);
}

async function deleteOrderDetail(orderDetailId) {
    await doDelete("orderdetail", orderDetailId);
}

async function deleteProduct(productId) {
    await doDelete("product", productId);
}

async function deleteCategory(categoryId) {
    await doDelete("category", categoryId);
}

//////////////////////////////////////////////////////////////////////////////

async function doPut(pathTerminal, dataObject, dataObjectId) {
    const token = tokenStore.getToken();
    const fetchConfig = { method: "PUT", 
                          headers: {"Content-Type":"application/json",                                      
                                    "Authorization": "Bearer " + token
                                   },
                                   body: JSON.stringify(dataObject)};
console.log("Network.doPut[1]",fetchConfig);
    const response = await fetch("http://localhost:8080/" + pathTerminal + "/" + dataObjectId, fetchConfig);
    if (!response.ok) throw new Error("El token ha expirado, por favor cierre sesión");
    const data = await response.json();
console.log("Network.doPut[2]",data);
    return data;
}

async function putCustomer(customer, customerId) {
    return await doPut("customer", customer, customerId);
}

async function putOrder(order, orderId) {
    return await doPut("order", order, orderId);
}

async function putProduct(product, productId) {
console.log("Network.putProduct",product);
    return await doPut("product", product, productId);
}

async function putOrderDetail(orderDetail, orderDetailId) {
    return await doPut("orderdetail", orderDetail, orderDetailId);
}

async function putCategory(category, categoryId) {
    return await doPut("category", category, categoryId);
}

//////////////////////////////////////////////////////////////////////////////

export {getAuth, getCustomers, getOrders, getProducts, getCategories,
        getOrdersByStatus, 
        getCustomer, getOrder, getProduct, getOrderDetail, getCategory, 
        postCustomer, postOrder, postProduct, postOrderDetail, postCategory,
        deleteCustomer, deleteOrder, deleteOrderDetail, deleteProduct, deleteCategory,
        putCustomer, putOrder, putProduct, putOrderDetail, putCategory};
