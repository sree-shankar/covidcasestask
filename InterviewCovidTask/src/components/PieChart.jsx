import React from 'react';
import Plot from 'react-plotly.js';
import { useSelector } from 'react-redux';

const PieChart = () => {
  const { data, filteredState } = useSelector((state) => state.covid);

  if (!data || !data.length) return <div>No data available for the pie chart</div>; // Guard against undefined or empty data

  const filteredData = filteredState
    ? data.filter((item) => item.state === filteredState)
    : data;

  const active = filteredData.reduce((acc, curr) => acc + curr.active, 0);
  const recovered = filteredData.reduce((acc, curr) => acc + curr.recovered, 0);
  const deaths = filteredData.reduce((acc, curr) => acc + curr.deaths, 0);

  return (
    <Plot
      data={[
        {
          values: [active, recovered, deaths],
          labels: ['Active', 'Recovered', 'Deaths'],
          type: 'pie',
        },
      ]}
      layout={{ title: 'COVID Cases Distribution' }}
    />
  );
};

export default PieChart;
