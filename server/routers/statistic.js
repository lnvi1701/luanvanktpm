const express = require('express');
const app = express();
const stockDB = require('./stockDB'); // Import your stockDB object

app.get('/stock-statistics', async (req, res) => {
  try {
    const overallStatistics = await stockDB.getOverallStatistics(); // You need to define this function in your stockDB file
    const categoryStatistics = await stockDB.getCategoryStatistics(); // You need to define this function in your stockDB file
    const userStatistics = await stockDB.getUserStatistics(); // You need to define this function in your stockDB file

    const stockStatistics = {
      overallStatistics,
      categoryStatistics,
      userStatistics
    };

    res.json(stockStatistics);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/chart-data', async (req, res) => {
  try {
    const chartData = await stockDB.getDataForChart(); // You need to define this function in your stockDB file
    res.json(chartData);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
