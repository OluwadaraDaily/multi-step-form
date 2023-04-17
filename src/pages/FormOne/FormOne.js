import './FormOne.scss'
import FormInput from '../../components/FormInput/FormInput'
import { useSelector } from 'react-redux'
import { useState, useContext, useEffect } from 'react'
import { FormContext } from '../../layouts/MobileLayout/MobileLayout'
import { useFormik } from 'formik'
import { basicSchema } from '../../schemas'

function FormOne({ submitForm, formikValues, formikHandleChange, formikErrors, formikTouched, formikHandleSubmit, formikHandleBlur, formikOnSubmit }) {
  // Form one state from the store
  const formOneState = useSelector((state) => state.formOne)
  // Set initial state with values from the store
  const initialDataState = {
    name: formOneState.name,
    phoneNumber: formOneState.phoneNumber,
    emailAddress: formOneState.emailAddress
  }

  
  // Submit form on change of `submitForm`
  useEffect(() => {
    if(submitForm) {
      const submitBtn = document.getElementById("submit-btn")
      submitBtn.click()
    }
  }, [submitForm])

  // Use context from mobile layout
  // const formOneData = useContext(FormContext)

  // Use Formik for form state management
  // const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
  //   initialValues: {
  //     name: '',
  //     emailAddress: '',
  //     phoneNumber: ''
  //   },
  //   validationSchema: basicSchema
  // })


  return (
    <form id='form' onSubmit={formikHandleSubmit}>
      <div className='form-one-container'>
        {/* <pre>{ JSON.stringify(formOneData) }</pre> */}
        <div className="text-section">
          <h1 className="title">Personal Info</h1>
          <p className="text">
            Please provide your name, email address, and phone number.
          </p>
        </div>
        <div className="form-section">
          {/* <FormInput label="Name" placeholder="e.g. Stephen King" onChange={(e) => handleOnChange(e.target.value, 'name')} value={dataObj['name']} /> */}
          {/* <FormInput label="Email Address" placeholder="e.g. stephenking@lorem.com" onChange={(e) => handleOnChange(e.target.value, 'emailAddress')} value={dataObj['emailAddress']} /> */}
          {/* <FormInput label="Phone Number" placeholder="e.g. +234 810 121 7017" onChange={(e) => handleOnChange(e.target.value, 'phoneNumber')} value={dataObj['phoneNumber']} /> */}
          <FormInput label="Name" id="name" placeholder="e.g. Stephen King" onChange={formikHandleChange} value={formikValues.name} errors={formikErrors} touched={formikTouched} handleOnBlur={formikHandleBlur} />
          <FormInput label="Email Address" id="emailAddress" placeholder="e.g. stephenking@lorem.com" onChange={formikHandleChange} value={formikValues.emailAddress} errors={formikErrors} touched={formikTouched} handleOnBlur={formikHandleBlur} />
          <FormInput label="Phone Number" id="phoneNumber" placeholder="e.g. +234 810 121 7017" onChange={formikHandleChange} value={formikValues.phoneNumber} errors={formikErrors} touched={formikTouched} handleOnBlur={formikHandleBlur} />
          <input type="submit" id='submit-btn' value="" style={{ display: 'none' }} />
        </div>
      </div>
    </form>
  )
}

export default FormOne