import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    // Fetch analytics data from backend
    axios.get("/api/analytics")
      .then((response) => {
        setAnalyticsData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching analytics:", error);
      });
  }, []);

  if (!analyticsData) return <div>Loading...</div>;

  return (
    <div>
      <h2>Chatbot Analytics</h2>
      <div>
        <h3>Total Queries: {analyticsData.query_count}</h3>
        <h3>Popular Queries:</h3>
        <ul>
          {analyticsData.popular_queries.map((query, index) => (
            <li key={index}>
              <strong>{query.user_query}</strong> - {query.count} times
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
