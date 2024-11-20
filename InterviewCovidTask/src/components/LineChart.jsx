


import React from 'react';
import Plot from 'react-plotly.js';
import { useSelector } from 'react-redux';
import styled from 'styled-components';



const LineChart = () => {
  const { data, filteredState } = useSelector((state) => state.covid);

  if (!data || !data.length) {
    return <div>No data available for the line chart</div>;
  }

  const filteredData = filteredState
    ? data.filter((item) => item.state === filteredState)
    : data;

  const states = filteredData.map((item) => item.state);
  const activeCases = filteredData.map((item) => item.active);
  const recoveredCases = filteredData.map((item) => item.recovered);
  const deaths = filteredData.map((item) => item.deaths);

  return (
    <ChartContainer>
      <Plot
        data={[
          { x: states, y: activeCases, type: 'scatter', mode: 'lines+markers', name: 'Active' },
          { x: states, y: recoveredCases, type: 'scatter', mode: 'lines+markers', name: 'Recovered' },
          { x: states, y: deaths, type: 'scatter', mode: 'lines+markers', name: 'Deaths' },
        ]}
        layout={{
          title: 'COVID Cases by State',
          // autosize: true, // Enable responsiveness in Plotly
          // xaxis: { title: 'States' },
          // yaxis: { title: 'Cases' },
        }}
        useResizeHandler={true} // Enable automatic resizing
        style={{ width: '100%', height: '100%' }} // Stretch to container
      />
    </ChartContainer>
  );
};

export default LineChart;



// Styled container for responsiveness
const ChartContainer = styled.div`
  width: 100%;
  max-width: 800px;
  /* margin: 0 auto; 
  padding: 0px; */

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