import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Fetch historical prices with optional date range parameters
export const fetchHistoricalPrices = (startDate, endDate) => {
  return axios.get(`${API_URL}/historical-prices`, { params: { start: startDate, end: endDate } });
};

// Fetch forecast data
export const fetchForecast = () => {
  return axios.get(`${API_URL}/forecast`);
};

// Fetch events data
export const fetchEvents = () => {
  return axios.get(`${API_URL}/events`);
};

// Fetch performance metrics
export const fetchMetrics = () => {
  return axios.get(`${API_URL}/metrics`);
};
