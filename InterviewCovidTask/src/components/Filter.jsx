import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilteredState } from "../redux/covidSlice";
import styled from "styled-components";

const Filter = () => {
    const dispatch = useDispatch();
    const covidData = useSelector((state) => state.covid.data);
    const filteredState = useSelector((state) => state.covid.filteredState);

    const handleChange = (event) => {
        dispatch(setFilteredState(event.target.value));
    };

    const selectedStateData = filteredState
        ? covidData.find((item) => item.state === filteredState)
        : null;

    return (
        <>
      <Header>Select States To View Covid Cases</Header> 
        <FilterContainer>
            <Card>
                <select onChange={handleChange}>
                    <option value="">All States</option>
                    {covidData.map((item) => (
                        <option key={item.state} value={item.state}>
                            {item.state}
                        </option>
                    ))}
                </select>
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
                    <Placeholder>Select a state to view data</Placeholder>
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
