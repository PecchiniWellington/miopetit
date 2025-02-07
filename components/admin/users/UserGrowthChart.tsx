"use client";
import { motion } from "framer-motion";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
/* 
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
]; */

const UserGrowthChart = ({ users }: { users?: { data: IUser[] } }) => {
  const createdAt = users?.data.reduce((acc /* user */) => {
    /*  const date = new Date(user.createdAt);
    const monthIndex = date.getMonth();
    const monthName = monthNames[monthIndex]; */

    /*  const existingEntry = acc.find(
      (entry: IUser) => entry.createdAt.toString() === monthName
    ); */
    /* if (existingEntry) {
      (existingEntry as IUser).users += 1;
    } else {
      acc.push({ month: monthName, users: 1 });
    } */

    return acc;
  }, []);

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
      className="bg-opacity/50 rounded-xl border border-gray-700 bg-gray-800 p-6 shadow-lg backdrop-blur-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="mb-4 text-xl font-semibold text-gray-100">User Growth</h2>
      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={createdAt?.reverse()}>
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
