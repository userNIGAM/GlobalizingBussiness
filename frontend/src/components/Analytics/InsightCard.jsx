import React from "react";
import { TrendingUp } from "lucide-react";

const InsightCard = ({ title, value, iconColor }) => (
  <div className="bg-white p-4 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow flex items-center justify-between">
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xl font-bold text-gray-900">{value}</p>
    </div>
    <TrendingUp className={`h-6 w-6 text-${iconColor}-500`} />
  </div>
);

export default InsightCard;
