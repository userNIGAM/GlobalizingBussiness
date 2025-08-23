import React from "react";
import InsightCard from "./InsightCard";

const Analytics = () => {
  const insights = [
    { title: "Profile Completion", value: "85%", iconColor: "blue" },
    {
      title: "Network Growth",
      value: "23 new connections",
      iconColor: "green",
    },
    { title: "Active Projects", value: "5 ongoing", iconColor: "purple" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid gap-4 md:grid-cols-3">
      {insights.map((insight, idx) => (
        <InsightCard key={idx} {...insight} />
      ))}
    </div>
  );
};

export default Analytics;
