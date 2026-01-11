import React from "react";

const StatsCard = ({ title, value, change, icon: Icon }) => {
  const isPositive = change > 0;
  const changeColor =
    change === null
      ? "text-gray-500"
      : isPositive
      ? "text-green-500"
      : "text-red-500";

  return (
    <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-lg flex items-center space-x-4">
      <div className="p-3 bg-linear-to-tr from-blue-500 to-green-500 rounded-xl text-white">
        <Icon size={28} />
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {title}
        </h3>
        <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
          {value}
        </p>
        {change !== null && (
          <p className={`text-xs font-semibold ${changeColor}`}>
            {isPositive ? "▲" : "▼"} {Math.abs(change)}%
          </p>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
