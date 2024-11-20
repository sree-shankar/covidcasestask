

import React from 'react';
import Plot from 'react-plotly.js';
import { useSelector } from 'react-redux';
import styled from 'styled-components';



const PieChart = () => {
  const { data, filteredState } = useSelector((state) => state.covid);

  if (!data || !data.length) {
    return <div>No data available for the pie chart</div>;
  }

  const filteredData = filteredState
    ? data.filter((item) => item.state === filteredState)
    : data;

  const active = filteredData.reduce((acc, curr) => acc + curr.active, 0);
  const recovered = filteredData.reduce((acc, curr) => acc + curr.recovered, 0);
  const deaths = filteredData.reduce((acc, curr) => acc + curr.deaths, 0);

  return (
    <ChartContainer>
      <Plot
        data={[
          {
            values: [active, recovered, deaths],
            labels: ['Active', 'Recovered', 'Deaths'],
            type: 'pie',
          },
        ]}
        layout={{
          title: 'COVID Cases Distribution',
          autosize: true, // Enable responsiveness in Plotly
        }}
        useResizeHandler={true} // Enable automatic resizing
        style={{ width: '100%', height: '100%' }} // Stretch to container
      />
    </ChartContainer>
  );
};

export default PieChart;

// Styled container for responsiveness
const ChartContainer = styled.div`
  width: 100%;
  max-width: 600px; /* Limit max size for larger screens */
  margin: 0 auto; /* Center the chart */
  /* padding: 10px; */

  @media (max-width: 768px) {
    max-width: 100%; /* Adjust for tablets and smaller devices */
  }

  @media (max-width: 480px) {
    max-width: 100%; /* Full width for mobile devices */
  }

  canvas {
    width: 100% !important; /* Ensure canvas scales properly */
    height: auto !important;
  }
`;