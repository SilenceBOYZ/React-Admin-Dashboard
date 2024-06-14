import instance from "../config/axios";

async function fecthOrderData(pageNum) {
  if(!pageNum) pageNum = 1;
  let data = await instance.get(`/api/orders/get-orders?pageNum=${pageNum}`);
  return data;
}

async function fetchUserOrderDetail(orderId, userId) {
  let data = await instance.get(`/api/orders/get-order-detail?orderId=${orderId}&userId=${userId}`)
  return data.dataSelected;
}

async function fetchOrders() {
  let data = await instance.get(`/api/orders/get-order-infor`);
  return data.dataSelected;
}

async function fetchItemOrders() {
  let data = await instance.get(`/api/orders/get-order-item-quantity`);
  return data.dataSelected;
}


export {fecthOrderData, fetchUserOrderDetail, fetchOrders, fetchItemOrders}