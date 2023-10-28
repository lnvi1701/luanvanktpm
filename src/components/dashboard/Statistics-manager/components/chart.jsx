import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Bar } from "react-chartjs-2";
import { getItemsCountByUser, getItemsCountByCategory, getItemStatuses } from "../../../api/stock-manager";


function Statistics() {
  const [categoryCounts, setCategoryCounts] = useState([]);
  const [userCounts, setUserCounts] = useState([]);
  const [itemStatuses, setItemStatuses] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch category counts
        const categoryCountsData = await getItemsCountByCategory();
        setCategoryCounts(categoryCountsData);

        // Fetch user counts
        const userCountsData = await getItemsCountByUser();
        setUserCounts(userCountsData);

        // Fetch item statuses
        const itemStatusesData = await getItemStatuses();
        setItemStatuses(itemStatusesData);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    }

    fetchData();
  }, []);

  // Create datasets for the charts
  const categoryChartData = {
    labels: categoryCounts.map(category => category.category),
    datasets: [
      {
        label: "Count",
        data: categoryCounts.map(category => category.count),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const userChartData = {
    labels: userCounts.map(user => user.user),
    datasets: [
      {
        label: "Count",
        data: userCounts.map(user => user.count),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const itemStatusChartData = {
    labels: itemStatuses.map(status => status.status),
    datasets: [
      {
        label: "Count",
        data: itemStatuses.map(status => status.count),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Statistics</h2>

      <h3>Category Counts</h3>
      <Bar data={categoryChartData} />

      <h3>User Counts</h3>
      <Bar data={userChartData} />

      <h3>Item Statuses</h3>
      <Bar data={itemStatusChartData} />
    </div>
  );
}

export default connect()(Statistics);
