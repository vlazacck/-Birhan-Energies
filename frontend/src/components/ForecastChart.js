import React, { useEffect, useState } from 'react';
import { fetchForecast } from '../services/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Grid } from '@mui/material';
import '../App.css'; // Import shared styles

const ForecastChart = () => {
  const [forecastData, setForecastData] = useState([]);
  
  useEffect(() => {
    fetchForecast()
      .then(response => {
        const formattedData = response.data.map(item => ({
          date: item.Date,  
          forecastedPrice: item.Forecasted_Price,
          forecastedVolatility: item.Forecasted_Volatility
        }));
        setForecastData(formattedData);
      })
      .catch(error => {
        console.error("Error fetching forecast data:", error);
      });
  }, []);
  
  return (
    <Grid item xs={12}>
      <h2>Forecasted Prices</h2>
      {forecastData.length > 0 ? (
        <ResponsiveContainer width="101%" height={400}>
          <LineChart data={forecastData}>
            <CartesianGrid stroke="black" strokeDasharray="3 3" /> {/* Grid lines black */}
            <XAxis 
              dataKey="date" 
              tick={{ fill: 'black' }} // X-axis text black
              className="chart-text"
            />
            <YAxis 
              tick={{ fill: 'black' }} // Y-axis text black
              className="chart-text"
            />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="forecastedPrice" 
              stroke="black" // Line black
              strokeWidth={2} 
              className="chart-line"
            />
            <Line 
              type="monotone" 
              dataKey="forecastedVolatility" 
              stroke="black" // Line black
              strokeWidth={2} 
              className="chart-line"
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p>No forecast data available.</p>
      )}
    </Grid>
  );
};

export default ForecastChart;
