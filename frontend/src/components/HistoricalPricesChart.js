import React, { useEffect, useState } from 'react';
import { fetchHistoricalPrices } from '../services/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Grid } from '@mui/material';
import '../App.css'; // Import the shared styles

const HistoricalPricesChart = () => {
  const [historicalData, setHistoricalData] = useState([]);
  
  useEffect(() => {
    const startDate = '1987-05-01';  
    const endDate = '1987-06-01';    
    
    fetchHistoricalPrices(startDate, endDate)
      .then(response => {
        const formattedData = response.data.map(item => ({
          date: new Date(item.Date).toLocaleDateString(),  
          price: item.Price
        }));
        setHistoricalData(formattedData);
      })
      .catch(error => {
        console.error("Error fetching historical prices:", error);
      });
  }, []);
  
  return (
    <Grid item xs={12}>
      <h2>Historical Prices</h2>
      {historicalData.length > 0 ? (
        <ResponsiveContainer width="101%" height={400}>
          <LineChart data={historicalData}>
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
              dataKey="price" 
              stroke="black" // Line black
              strokeWidth={2} 
              className="chart-line"
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p>No data available.</p>
      )}
    </Grid>
  );
};

export default HistoricalPricesChart;
