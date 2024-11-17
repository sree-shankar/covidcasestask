import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCovidData } from './redux/covidSlice';
import Filter from './components/Filter';
import PieChart from './components/PieChart';
import MapView from './components/MapView';
import LineChart from './components/LineChart';
import styled, { keyframes } from 'styled-components';



const App = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.covid);
  const covidData = useSelector((state) => state.covid.data);
  const filteredState = useSelector((state) => state.covid.filteredState);
  const selectedStateData = filteredState
    ? covidData.find((item) => item.state === filteredState)
    : null;

  useEffect(() => {
    dispatch(fetchCovidData());
  }, [dispatch]);

  if (loading)
    return (
      <LoaderContainer>
        <Spinner />
      </LoaderContainer>
    );

  if (!data.length) return <div>No data available</div>;

  return (
    <MainContainer>
      <Header>COVID Data Visualization</Header>
  
         <TopSection>
      <LeftSection>
        <ChartContainer>
          <PieChart />
        </ChartContainer>
      </LeftSection>
      <CenterSection>
        <Filter />
      </CenterSection>
      <RightSection>
        <ChartContainer>
          <LineChart />
        </ChartContainer>
      </RightSection>
    </TopSection>
      <BottomSection>
      <ChartContainer>
        <MapView 
        // data={data} 
        selectedStateData={selectedStateData}
        />
        </ChartContainer>
      </BottomSection>
      
    </MainContainer>
  );
};




export default App;





const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

 const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;

  z-index: 9999;
`;

 const Spinner = styled.div`
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: ${spin} 1.5s linear infinite;
`;


const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 80px;
  font-family: Arial, sans-serif;
  padding: 20px;
`;

const Header = styled.h1`
  text-align: center;
  margin: 0; 
  background-color: #017e7e;
  color: white;
  padding: 10px 0px;
  position: fixed; 
  top: 0; 
  left: 0; 
  right: 0; 
  z-index: 1000; 
  
`;
const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
  gap: 20px;

  @media (max-width: 1024px) {
    gap: 15px;
    flex-wrap:wrap;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
    gap: 10px;
  }
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding: 15px; */
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 20px;
  }
`;

const CenterSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #e6f7f7;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top:100px;

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 20px;
  }
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding: 15px; */
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ChartContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;



 const BottomSection = styled.div`
  margin-top: 20px;
  height: 400px;
`;