import React, { useState } from "react";

const PredictExpense = () => {
  const [category, setCategory] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handlePredict = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category }),
      });

      const data = await response.json();

      if (response.ok) {
        setPrediction(data.predicted_expense);
        setError(null);
      } else {
        setError(data.error);
        setPrediction(null);
      }
    } catch (err) {
      setError("Failed to fetch prediction. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Predict Future Expenses
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Unlock the power of linear regression to predict future expenses across different categories. 
          Whether it's groceries, travel, or utilities, our advanced algorithm analyzes trends to provide 
          accurate forecasts. Simply enter a category below and let the magic happen!
        </p>
        <div className="space-y-4">
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter category (e.g., Groceries, Travel)"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handlePredict}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
          >
            Predict Expense
          </button>
        </div>
        {prediction && (
          <div className="mt-6 p-4 bg-green-50 rounded-lg text-green-700 text-center">
            <p className="font-semibold">
              Predicted Expense: <span className="text-2xl">${prediction.toFixed(2)}</span>
            </p>
          </div>
        )}
        {error && (
          <div className="mt-6 p-4 bg-red-50 rounded-lg text-red-700 text-center">
            <p className="font-semibold">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictExpense;