"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const UserGrowthChart = ({ users }: any) => {
  const createdAt = users.data.reduce((acc, user) => {
    const date = new Date(user.createdAt);
    const monthIndex = date.getMonth();
    const monthName = monthNames[monthIndex];

    const existingEntry = acc.find((entry) => entry.month === monthName);
    if (existingEntry) {
      existingEntry.users += 1;
    } else {
      acc.push({ month: monthName, users: 1 });
    }

    return acc;
  }, []);

  console.log("CREA", createdAt);
  /*  const userGrowthData = users.reduce((acc, user) => {
    const date = new Date(user.createdAt);
    const monthIndex = date.getMonth(); 
    const monthName = monthNames[monthIndex]; 

    const existingEntry = acc.find((entry) => entry.month === monthName);
    if (existingEntry) {
      existingEntry.users += 1;
    } else {
      acc.push({ month: monthName, users: 1 });
    }

    return acc;
  }, []); */
  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-xl font-semibold text-gray-100 mb-4">User Growth</h2>
      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={createdAt.reverse()}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="month" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
            />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#8B5CF6"
              strokeWidth={2}
              dot={{ fill: "#8B5CF6", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
export default UserGrowthChart;
