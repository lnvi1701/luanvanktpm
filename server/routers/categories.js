const express = require('express');
const dbLogin = require('../db');
const router = express.Router();

// GET route to fetch all categories
router.get('/', async (req, res) => {
  try {
    const results = await dbLogin.getAllCategories();
    res.json(results);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// POST route to add a new category
router.post("/add", async (req, res, next) => {
  try {
    const payload = req.body;
    // Ensure that optional properties are set to null if they are undefined
    if (typeof payload.id_categori === "undefined") {
      payload.id_categori = null;
    }
    let results = await dbLogin.addCategory(payload);
    res.json(results);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// POST route to update a category
router.post('/update', async (req, res) => {
  try {
    const payload = req.body;
    const result = await dbLogin.updateCategory(payload);

    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
    console.log(`Updated category with ID ${payload.id} successfully.`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST route to delete a category
router.post('/delete', async (req, res) => {
  try {
    const payload = req.body;
    const result = await dbLogin.deleteCategory(payload);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

module.exports = router;
