# app.py
from flask import Flask, jsonify, request
from flask_cors import CORS 
import pandas as pd

app = Flask(__name__)

CORS(app)

# Load cleaned data
data = pd.read_csv('cleaned_data.csv', index_col='Date', parse_dates=True)

# Load forecast data (if available)
try:
    forecast_data = pd.read_csv('forecasts.csv')
except FileNotFoundError:
    forecast_data = None


# Generate dummy event data
dummy_events = [
    {'id': 1, 'Date': '2020-03-01', 'Event': 'Geopolitical Conflict', 'Impact': 'Price Spike'},
    {'id': 2, 'Date': '2021-05-01', 'Event': 'OPEC Policy Change', 'Impact': 'Price Drop'},
    {'id': 3, 'Date': '2022-01-01', 'Event': 'Global Recession', 'Impact': 'Price Decline'}
]


# API endpoint for events
@app.route('/api/events', methods=['GET'])
def get_events():
    return jsonify(dummy_events)

@app.route('/api/oil-prices', methods=['GET'])
def get_oil_prices():
    return jsonify(data.reset_index().to_dict(orient='records'))
# API endpoint for historical prices
@app.route('/api/historical-prices', methods=['GET'])
def get_historical_prices():
    # Get query parameters for date range
    start_date = request.args.get('start', default=None, type=str)
    end_date = request.args.get('end', default=None, type=str)

    # Filter data based on date range
    if start_date and end_date:
        filtered_data = data.loc[start_date:end_date]
    else:
        filtered_data = data

    # Convert DataFrame to JSON
    return jsonify(filtered_data.reset_index().to_dict(orient='records'))

@app.route('/api/historical-prices-with-filters', methods=['GET'])
def get_filtered_prices():
    start_date = request.args.get('start', default=None, type=str)
    end_date = request.args.get('end', default=None, type=str)
    variable = request.args.get('variable', default=None, type=str)  # e.g., GDP, Inflation

    filtered_data = data.loc[start_date:end_date]

    if variable and variable in data.columns:
        filtered_data = filtered_data[['Price', variable]]
    elif variable:
        return jsonify({"error": f"Variable '{variable}' not found."}), 400

    return jsonify(filtered_data.reset_index().to_dict(orient='records'))
# API endpoint for forecast
@app.route('/api/forecast', methods=['GET'])
def get_forecast():
    if forecast_data is not None:
        return jsonify(forecast_data.to_dict(orient='records'))
    else:
        return jsonify([])  # Return empty list if forecast data is unavailable

# API endpoint for model metrics
@app.route('/api/metrics', methods=['GET'])
def get_metrics():
    metrics = {
        'RMSE': 12.11,
        'MAE': 11.78,
        'AIC': 21070.073,
        'BIC': 21105.192
    }
    return jsonify(metrics)


@app.route('/', methods=['GET'])
def home():
    return "Welcome to the API! Visit /api/events for events data."

@app.route('/favicon.ico')
def favicon():
    return '', 204  # No content response

# Run the Flask app

if __name__ == '__main__':
    app.run(debug=True)
