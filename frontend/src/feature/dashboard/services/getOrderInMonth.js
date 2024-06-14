import filterMonthExistInOrder from "./filterMonth";
import { formatMonth } from "../../../utlis/formatDate";

function getOrderInMonth(orders) {
  let barChart = [];
  let orderMonthInfor = orders.map(order => formatMonth(order.createdAt));
  let numberOfMonth = filterMonthExistInOrder(orderMonthInfor);
  let data = new Array(numberOfMonth.length)
  numberOfMonth.forEach((month, index) => {
    data[index] = orders
      .filter(order => formatMonth(order.createdAt) === month)
      .map(order => { return { month: formatMonth(order.createdAt), value: order.totalAmount } })
  })
  let object = {};
  data = data.filter(order => Object.entries(order).length > 0);
  data.forEach(orders => {
    orders.forEach(order => {
      if (object["value"]) {
        object["value"] += order.value;
      } else {
        object.name = `Tháng ${order.month[0]}`;
        object["value"] = order.value;
      }
    })
    barChart.push(object);
    object = {};
  });
  barChart = barChart.sort((a, b) => a.name.localeCompare(b.name));
  return barChart
}

export default getOrderInMonth
