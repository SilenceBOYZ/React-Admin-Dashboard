import { Cell, Pie, PieChart, Tooltip } from "recharts"
import { colorCells } from "../../utlis/constraint"
import Heading from "../../ui/Heading"
import formatCurrency from "../../utlis/formatCurrency"
import getTotalItemPrice from "./services/getTotalItemPrice";

function ItemPieChart({ data, query }) {
  let chartData = getTotalItemPrice(data, query);
  return (
    <>
      {!chartData.length ? <p className="w-full text-center text-2xl">No Item have sold 🙁</p> :
        <>
          <PieChart width={250} height={250}>
            <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={90}  >
              {chartData.map((entry, index) => {
                return <Cell key={`cell-${index}`} fill={colorCells[index % colorCells.length]} />
              }
              )}
            </Pie>
            <Tooltip
              itemStyle={{ color: "#7e22ce" }}
              contentStyle={{ borderRadius: "8px" }}
              formatter={(value) => formatCurrency(value)}
            />
          </PieChart>
          <ol className="space-y-3">
            <li className=""><Heading type="h3" color="primary">Top {chartData.length} những món bán chạy</Heading></li>
            {chartData.map((item, index) => <li style={{color: `${colorCells[index]}`}} key={index}> {index + 1}. {item.name}: {formatCurrency(item.value)}</li>)}
          </ol>
        </>
      }
    </>
  )
}

export default ItemPieChart;
