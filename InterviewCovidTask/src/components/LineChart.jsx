import React from 'react';
import Plot from 'react-plotly.js';
import { useSelector } from 'react-redux';

const LineChart = () => {
  const { data, filteredState } = useSelector((state) => state.covid);
  const filteredData = filteredState
    ? data.filter((item) => item.state === filteredState)
    : data;

  const states = filteredData.map((item) => item.state);
  const activeCases = filteredData.map((item) => item.active);
  const recoveredCases = filteredData.map((item) => item.recovered);
  const deaths = filteredData.map((item) => item.deaths);

  return (
    <Plot
      data={[
        { x: states, y: activeCases, type: 'scatter', mode: 'lines+markers', name: 'Active' },
        { x: states, y: recoveredCases, type: 'scatter', mode: 'lines+markers', name: 'Recovered' },
        { x: states, y: deaths, type: 'scatter', mode: 'lines+markers', name: 'Deaths' },
      ]}
      layout={{ title: 'COVID Cases by State' }}
    />
  );
};

export default LineChart;
