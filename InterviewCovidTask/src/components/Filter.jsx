import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilteredState } from "../redux/covidSlice";
import styled from "styled-components";
import { useState, useEffect } from 'react';


const Filter = () => {
    const dispatch = useDispatch();
    const covidData = useSelector((state) => state.covid.data);
    const filteredState = useSelector((state) => state.covid.filteredState);

    // const handleChange = (event) => {
    //     dispatch(setFilteredState(event.target.value));
    // };

    // const selectedStateData = filteredState
    //     ? covidData.find((item) => item.state === filteredState)
    //     : null;

// Calculate total data for all states
  const totalData = covidData.reduce(
    (totals, item) => ({
      active: totals.active + (item.active || 0),
      recovered: totals.recovered + (item.recovered || 0),
      deaths: totals.deaths + (item.deaths || 0),
    }),
    { active: 0, recovered: 0, deaths: 0 }
  );




const [selectedStateData, setSelectedStateData] = useState(null);
const [isAnimating, setIsAnimating] = useState(false);
const [animationInterval, setAnimationInterval] = useState(null);

useEffect(() => {
  if (filteredState) {
    const stateData = covidData.find((item) => item.state === filteredState);
    setSelectedStateData(stateData);
  } else {
    setSelectedStateData(null);
  }
}, [filteredState, covidData]);


 // Handle dropdown change
 const handleChange = (event) => {
    const selectedState = event.target.value;
    dispatch(setFilteredState(selectedState));
  };

  // Start or stop animation
  const toggleAnimation = () => {
    if (isAnimating) {
      stopAnimation();
    } else {
      startAnimation();
    }
  };

  // Start animation
  const startAnimation = () => {
    setIsAnimating(true);
    let index = 0;

    const interval = setInterval(() => {
      if (index >= covidData.length) {
        clearInterval(interval);
        setIsAnimating(false);
        resetDropdown(); // Reset the dropdown to default state
        return;
      }
      dispatch(setFilteredState(covidData[index].state));
      index++;
    }, 2000); // Adjust speed (1000ms = 1 second)

    setAnimationInterval(interval);
  };

  // Stop animation
  const stopAnimation = () => {
    if (animationInterval) {
      clearInterval(animationInterval);
      setAnimationInterval(null);
    }
    setIsAnimating(false);
  };
    // Reset the dropdown to default state
    const resetDropdown = () => {
        dispatch(setFilteredState("")); // Clear the selected state in Redux
      };

    return (
        <>
      <Header>Select States To View Covid Cases</Header> 
        <FilterContainer>
            <Card>
                <select onChange={handleChange} value={filteredState || ''}>
                    <option value="">All States</option>
                    {covidData.map((item) => (
                        <option key={item.state} value={item.state}>
                            {item.state}
                        </option>
                    ))}
                </select>&nbsp;
                <AnimatedButton onClick={toggleAnimation}>
            {isAnimating ? "Stop" : "Animate"}
          </AnimatedButton>

                {selectedStateData ? (
                    <>
                        <StateName>{selectedStateData.state}</StateName>
                        <DataRow>
                            <DataLabel>Active:</DataLabel>{" "}
                            <DataValue>{selectedStateData.active}</DataValue>
                        </DataRow>
                        <DataRow>
                            <DataLabel>Recovered:</DataLabel>{" "}
                            <DataValue>{selectedStateData.recovered}</DataValue>
                        </DataRow>
                        <DataRow>
                            <DataLabel>Deaths:</DataLabel>{" "}
                            <DataValue>{selectedStateData.deaths}</DataValue>
                        </DataRow>
                    </>
                ) : (
                    // <Placeholder>Select a state to view data</Placeholder>
                    <>
                    <StateName>All States</StateName>
                    <DataRow>
                      <DataLabel>Active:</DataLabel> <DataValue>{totalData.active}</DataValue>
                    </DataRow>
                    <DataRow>
                      <DataLabel>Recovered:</DataLabel> <DataValue>{totalData.recovered}</DataValue>
                    </DataRow>
                    <DataRow>
                      <DataLabel>Deaths:</DataLabel> <DataValue>{totalData.deaths}</DataValue>
                    </DataRow>
                  </>
        
                )}
            </Card>
            {/* <Header>Select States</Header> */}
        </FilterContainer>
        </>
    );
};

export default Filter;

const Header = styled.h3`
    text-align: center;
    margin-bottom: 20px;
    color: black;
`;

const FilterContainer = styled.div`
    select {
        padding: 10px 10px;
        border: 1px solid #267fca;
        border-radius: 4px;
        font-size: 1rem;
        overflow-y: auto;
    }

    /* Scrollbar Styling */
    select::-webkit-scrollbar {
        width: 8px; /* Width of the scrollbar */
    }

    select::-webkit-scrollbar-thumb {
        background-color: #aad3df; /* Blue scroll thumb */
        border-radius: 4px; /* Rounded corners for the thumb */
    }

    select::-webkit-scrollbar-track {
        background-color: #f1f1f1; /* Light gray track background */
    }
`;

const Card = styled.div`
    /* width: 100%; */
    padding: 15px;
    border: 1px solid #017e7e;
    border-radius: 8px;
    background-color: #e6f7f7;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StateName = styled.h3`
    font-size: 1.25rem;
    color: #267fca;
    margin-bottom: 10px;
    text-align: center;
`;

const DataRow = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 5px 0;
`;

const DataLabel = styled.span`
    font-weight: bold;
    color: #333;
`;

const DataValue = styled.span`
    font-weight: bold;
    color: #017e7e;
`;

const Placeholder = styled.p`
    text-align: center;
    color: #666;
`;
const AnimatedButton = styled.button`
  background-color: ${(props) => (props.disabled ? "#ddd" : "#007bff")};
  color: ${(props) => (props.disabled ? "#aaa" : "#fff")};
  font-size: 13px;
  padding: 10px 10px;
  border: none;
  border-radius: 5px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#ddd" : "#0056b3")};
  }

  &:active {
    background-color: ${(props) => (props.disabled ? "#ddd" : "#004085")};
  }
`;