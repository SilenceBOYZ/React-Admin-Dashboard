import cutDataInChart from "../../../utlis/cutDataInChart";
import { getDayAndPreviousDay } from "../../../utlis/getDayAndPreviousDay";
import filterUniqueIdItem from "./filterUniqueIdItem";

function getTotalItemPrice(itemQuantity, query) {
  const { dateAfter, today } = getDayAndPreviousDay(query);
  let chartData = [];
  let itemInData = itemQuantity.map(item => item.id);
  let itemUniques = filterUniqueIdItem(itemInData);
  // Lọc những id trùng trong data
  let data = new Array(itemUniques.length)
  itemUniques.forEach((id, index) => {
    data[index] = itemQuantity
    .filter(item => item.id === id && (new Date(item.createdAt) >= dateAfter && new Date(item.createdAt <= today)))
    .map(x => { return { foodName: x.foodName, totalAmount: parseInt(x.totalAmount) } })
  })

  let object = {};
  data = data.filter(item => Object.entries(item).length > 0);
  data.forEach(items => {
    items.forEach(item => {
      if (object["value"]) {
        object["value"] += item.totalAmount;
      } else {
        object.name = item.foodName;
        object["value"] = item.totalAmount;
      }
    })
    chartData.push(object);
    object = {};
  });
  chartData = cutDataInChart(chartData, 5).sort((a, b) => (a.value - b.value) * -1)
  return chartData;
}

export default getTotalItemPrice
