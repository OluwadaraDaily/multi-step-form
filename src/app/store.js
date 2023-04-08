import { configureStore } from "@reduxjs/toolkit";
import formOneReducer from '../features/formOne/formOneSlice'
import overallFormReducer from '../features/overallForm/overallFormSlice'

const store = configureStore({
  reducer: {
    formOne: formOneReducer,
    form: overallFormReducer
  }
})

export default store 