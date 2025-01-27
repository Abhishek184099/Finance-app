const fetch = require('node-fetch'); // Already included in Node.js

const predictExpense = async (req, res) => {
  try {
    const userId = req.user._id;
    const { category } = req.body;

    // Fetch transactions for the category
    const transactions = await Transaction.find({ userId, category });
    if (!transactions || transactions.length < 2) {
      return res.status(400).json({ error: "Not enough data for prediction" });
    }

    // Prepare data for prediction
    const amounts = transactions.map((t) => t.amount);

    // Send data to Python server
    const response = await fetch("http://localhost:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ expenses: amounts }),
    });

    const prediction = await response.json();

    if (response.ok) {
      return res.status(200).json(prediction);
    } else {
      return res.status(400).json(prediction);
    }
  } catch (err) {
    console.error("Error in predictExpense controller:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { predictExpense };
