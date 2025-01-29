from flask import Flask, request, jsonify
from pymongo import MongoClient
from regression import linear_regression  # Importing regression logic
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  

# MongoDB connection
client = MongoClient("mongodb://localhost:27017/")
db = client["finance"] 
expenses_collection = db["transactions"]  

@app.route('/api/predict', methods=['POST'])
def predict_expense():
    try:
        data = request.json
        category = data.get('category')



        if not category:
            return jsonify({"error": "Category is required"}), 400

        # Fetch past expenses for the specified category
        expenses = list(expenses_collection.find({"category": category }))
        print(expenses)
        
        if len(expenses) < 3:
            return jsonify({"error": "Not enough data for prediction"}), 400

        # Prepare data for regression
        x = list(range(len(expenses)))  # Time points
        y = [expense['amount'] for expense in expenses]  # Expense amounts

        # Perform linear regression to predict next month's expense
        predicted_expense = linear_regression(x, y)

        return jsonify({"predicted_expense": predicted_expense}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5001)  
