import React, { useEffect, useState } from 'react';
import { fetchMetrics } from '../services/api';

const MetricsDisplay = () => {
  const [metrics, setMetrics] = useState(null);
  
  useEffect(() => {
    fetchMetrics()
      .then(response => {
        setMetrics(response.data);  // Assuming the API response structure is correct
      })
      .catch(error => {
        console.error("Error fetching metrics:", error);
      });
  }, []);
  
  return (
    <div>
      <h2>Model Performance Metrics</h2>
      {metrics ? (
        <div>
          <p>RMSE: {metrics.RMSE}</p>
          <p>MAE: {metrics.MAE}</p>
          <p>AIC: {metrics.AIC}</p>
          <p>BIC: {metrics.BIC}</p>
        </div>
      ) : (
        <p>Model metrics unavailable.</p>
      )}
    </div>
  );
};

export default MetricsDisplay;
