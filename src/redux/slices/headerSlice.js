import { createSlice } from "@reduxjs/toolkit";

const headerSlice = createSlice({
  name: "header",
  initialState: {
    headerData:{}
  },
  reducers: {
    addHeaderData: (state, action) => {
        state.headerData = action.payload
    }
  },
});

export const { addHeaderData } = headerSlice.actions;

export default headerSlice.reducer;