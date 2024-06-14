import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import formatCurrency from "../../utlis/formatCurrency"
import { colorCells } from "../../utlis/constraint";
import getOrderInMonth from "./services/getOrderInMonth";

function RevenueOfYearChart({ data }) {

  let barDataChart = getOrderInMonth(data);

  return (
    <div className="w-full h-[20rem]">
      <ResponsiveContainer width="100%" height="100%" >
        <BarChart data={barDataChart} margin={{ left: 50 }} >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis dataKey="value" tickFormatter={(value) => formatCurrency(value)} />
          <Tooltip
            itemStyle={{ color: "#7e22ce" }}
            contentStyle={{ borderRadius: "8px" }}
            formatter={(value) => formatCurrency(value)}
          />
          <Bar dataKey="value" barSize={55} fill="#8884d8">
            {
              data.map((entry, index) => (
                <Cell key={index} fill={colorCells[index]} className="hover:cursor-pointer" />
              ))
            }
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default RevenueOfYearChart
