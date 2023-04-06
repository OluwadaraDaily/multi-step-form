import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  saved: false,
  name: '',
  emailAddress: '',
  phoneNumber: ''
}

const formOneSlice = createSlice({
  name: 'formOne',
  initialState,
  reducers: {
    saveFormOne: (state, action) => {
      state.name = action.payload.name
      state.emailAddress = action.payload.emailAddress
      state.phoneNumber = action.payload.phoneNumber
      state.saved = true
    }
  }
})

export default formOneSlice.reducer
export const { saveFormOne } = formOneSlice.actions