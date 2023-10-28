
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getItemsCountByUser } from "../../../api/stock-manager"; 
import { getItemsCountByCategory } from "../../../api/stock-manager"; 
import { getItemStatuses } from "../../../api/stock-manager"; 

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

  return (
    <div>
      <h2>Statistics</h2>

      <h3>Category Counts</h3>
      <ul>
        {categoryCounts.map((category, index) => (
          <li key={index}>
            <p>Category: {category.category}</p>
            <p>Count: {category.count}</p>
          </li>
        ))}
      </ul>

      <h3>User Counts</h3>
      <ul>
        {userCounts.map((user, index) => (
          <li key={index}>
            <p>User: {user.user}</p>
            <p>Count: {user.count}</p>
          </li>
        ))}
      </ul>

      <h3>Item Statuses</h3>
      <ul>
        {itemStatuses.map((status, index) => (
          <li key={index}>
            <p>Status: {status.status}</p>
            <p>Count: {status.count}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default connect()(Statistics);