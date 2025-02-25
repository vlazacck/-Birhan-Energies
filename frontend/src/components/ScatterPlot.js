// src/components/ScatterPlot.js
import React, { useEffect, useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';

const ScatterPlot = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/historical-prices');
        console.log('API response:', response.data); // Add this line to log the response data
        // Filter data to include only entries with both Price and Inflation
        const filteredData = response.data.filter(item => item.Inflation !== undefined && item.Price !== undefined);
        setData(filteredData);
      } catch (error) {
        console.error('Error fetching scatter plot data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!Array.isArray(data) || data.length === 0) return <p>No data available.</p>;

  return (
    <div>
      <h2>Scatter Plot: Price vs Inflation</h2>
      <ScatterChart width={800} height={400} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid />
        <XAxis type="number" dataKey="Inflation" name="Inflation" unit="%" />
        <YAxis type="number" dataKey="Price" name="Price" unit="USD/barrel" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Legend />
        <Scatter data={data} fill="#8884d8" />
      </ScatterChart>
    </div>
  );
};

export default ScatterPlot;