"use client";
import { ICategory, IProduct } from "@/core/validators";
import { motion } from "framer-motion";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const categoryData = [
  { name: "Electronics", value: 4500 },
  { name: "Clothing", value: 3200 },
  { name: "Home & Garden", value: 2800 },
  { name: "Books", value: 2100 },
  { name: "Sports & Outdoors", value: 1900 },
];

const generateColors = (numColors: number) => {
  const colors = [];
  for (let i = 0; i < numColors; i++) {
    const hue = Math.floor((i * 360) / numColors);
    colors.push(`hsl(${hue}, 60%, 40%)`);
  }
  return colors;
};

const CategoryDistributionChart = ({
  categories,
}: {
  categories?: { data: IProduct[] };
}) => {
  const colors = generateColors(categoryData.length);
  console.log("categories", categories);

  /* const newValue = categories?.data
    ?.filter((item) => item?.Product?.length > 0)
    .slice(0, 5)
    .map((item: ICategory & { Product: Product[] }) => {
      return {
        name: item.name,
        value: item?.Product?.length,
      };
    }); */

  /*  ?.filter((item) => item.value > 0); */

  return (
    <motion.div
      className="rounded-xl border border-gray-700 bg-gray-800  p-6 shadow-lg backdrop-blur-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="mb-4 text-lg font-medium text-gray-100">
        Category Distribution
      </h2>
      <div className="h-80">
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <PieChart>
            <Pie
              data={[]}
              cx={"50%"}
              cy={"50%"}
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {[]?.map((entry: ICategory, index: number) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
export default CategoryDistributionChart;
