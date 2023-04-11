import { configureStore } from "@reduxjs/toolkit";
import formOneReducer from '../features/formOne/formOneSlice'
import formTwoReducer from '../features/formTwo/formTwoSlice'
import overallFormReducer from '../features/overallForm/overallFormSlice'

const store = configureStore({
  reducer: {
    formOne: formOneReducer,
    formTwo: formTwoReducer,
    form: overallFormReducer
  }
})

export default store 