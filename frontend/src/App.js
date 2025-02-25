// src/App.js
import React from 'react';
import HistoricalPricesChart from './components/HistoricalPricesChart';
import ForecastChart from './components/ForecastChart';
import EventsTable from './components/EventsTable';
import MetricsDisplay from './components/MetricsDisplay';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import PriceVsInflationChart from './components/PricrVsInflationChart';
import ScatterPlot from './components/ScatterPlot';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Brent Oil Price Analysis Dashboard</h1>
      </header>
      <main>
        <HistoricalPricesChart />
        <ForecastChart />
        <EventsTable />
        <MetricsDisplay />
        <PriceVsInflationChart/>
        <ScatterPlot/>
      </main>
    </div>
  );
}

export default App;
