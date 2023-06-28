
import { createSlice } from "@reduxjs/toolkit";

const detailSlice = createSlice({
  name: "detail",
  initialState: {
    detailData:{}
  },
  reducers: {
    addDetailData: (state, action) => {
        state.detailData = action.payload
    }
  },
});

export const { addDetailData } = detailSlice.actions;

export default detailSlice.reducer;