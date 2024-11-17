import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';



export const fetchCovidData = createAsyncThunk('covid/fetchData', async () => {
  const response = await axios.get('https://673862db4eb22e24fca7c00d.mockapi.io/covidcases');
  console.log(response.data); // Debugging
  return response.data;
});



const covidSlice = createSlice({
  name: 'covid',
  initialState: {
    data: [], // Initialize as an empty array to avoid errors during rendering
    filteredState: null,
    loading: false,
  },
  reducers: {
    setFilteredState: (state, action) => {
      state.filteredState = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCovidData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCovidData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload || []; // Ensure fallback to an empty array
      })
      .addCase(fetchCovidData.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setFilteredState } = covidSlice.actions;
export default covidSlice.reducer;
