import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentTab: '1',
  tabStates: {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false
  }
}

const initialTabStates = {
  1: false,
  2: false,
  3: false,
  4: false,
  5: false
}

const overallFormSlice = createSlice({
  name: 'overallFormSlice',
  initialState,
  reducers: {
    setCurrentTab: (state, action) => {
      state.currentTab = action.payload
    },
    setTabStates: (state, action) => {
      state.tabStates = { ...initialTabStates }
      state.tabStates[action.payload] = true
      state.tabStates = {...state.tabStates}
    }
  }
})

export default overallFormSlice.reducer
export const { setCurrentTab, setTabStates } = overallFormSlice.actions