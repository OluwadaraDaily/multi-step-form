import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  saved: false,
  planName: null,
  price: null,
  planType: null
}

const formTwoSlice = createSlice({
  name: 'formTwo',
  initialState,
  reducers: {
    saveFormTwo: (state, action) => {
      state.planName = action.payload.planName
      state.price = action.payload.price
      state.planType = action.payload.planType
      state.saved = true
    }
  }
})

export default formTwoSlice.reducer
export const { saveFormTwo } = formTwoSlice.actions