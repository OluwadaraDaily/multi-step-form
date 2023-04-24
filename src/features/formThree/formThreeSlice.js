import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  saved: false,
  addOns: []
}

const formThreeSlice = createSlice({
  name: 'formThree',
  initialState,
  reducers: {
    saveFormThree: (state, action) => {
      state.addOns = action.payload.addOns || []
      state.saved = true
    } 
  }
})

export default formThreeSlice.reducer
export const { saveFormThree } = formThreeSlice.actions