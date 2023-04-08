import './FormOne.scss'
import FormInput from '../../components/FormInput/FormInput'
import { useSelector } from 'react-redux'
import { useState, useContext, useEffect } from 'react'
// import { saveFormOne } from '../../features/formOne/formOneSlice'
import { FormContext } from '../../layouts/MobileLayout/MobileLayout'

function FormOne({ handleFormOneData }) {
  // Form one state from the store
  const formOneState = useSelector((state) => state.formOne)

  // Set initial state with values from the store
  const initialDataState = {
    name: formOneState.name,
    phoneNumber: formOneState.phoneNumber,
    emailAddress: formOneState.emailAddress
  }

  const [dataObj, setDataObj] = useState(initialDataState)
  
  const handleOnChange = (data, name) => {
    setDataObj(prevState => {
      prevState[name] = data
      return {...prevState}
    })
  }

  useEffect(() => {
    handleFormOneData(dataObj)
  }, [dataObj])

  // Use context from mobile layout
  const formOneData = useContext(FormContext)

  return (
    <div className='form-one-container'>
      <pre>{ JSON.stringify(formOneData) }</pre>
      <div className="text-section">
        <h1 className="title">Personal Info</h1>
        <p className="text">
          Please provide your name, email address, and phone number.
        </p>
      </div>
      <div className="form-section">
        <FormInput label="Name" placeholder="e.g. Stephen King" onChange={(e) => handleOnChange(e.target.value, 'name')} value={dataObj['name']} />
        <FormInput label="Email Address" placeholder="e.g. stephenking@lorem.com" onChange={(e) => handleOnChange(e.target.value, 'emailAddress')} value={dataObj['emailAddress']} />
        <FormInput label="Phone Number" placeholder="e.g. +234 810 121 7017" onChange={(e) => handleOnChange(e.target.value, 'phoneNumber')} value={dataObj['phoneNumber']} />
      </div>
    </div>
  )
}

export default FormOne