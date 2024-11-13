from flask import Flask, request, jsonify
from regression import predict_future_expense

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict_expense():
    data = request.json
    expenses = data.get("expenses")  # List of past expenses 
    future_period = data.get("future_period", 1)  # Period to predict (default: next period)

    if not expenses or len(expenses) < 2:
        return jsonify({"error": "Not enough data points for prediction"}), 400

    # Prepare data for regression
    x = list(range(1, len(expenses) + 1))  # Time periods (1, 2, 3, ...)
    y = expenses

    # Get prediction
    predicted_value = predict_future_expense(x, y, future_period)
    return jsonify({"predicted_expense": predicted_value})

if __name__ == '__main__':
    app.run(port=5001, debug=True)
