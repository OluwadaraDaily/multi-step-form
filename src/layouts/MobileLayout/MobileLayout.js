import { useState, useEffect, createContext } from 'react'
import './MobileLayout.scss'
import Button from '../../components/Button/Button'
import FormOne from '../../pages/FormOne/FormOne'
import FormTwo from '../../pages/FormTwo/FormTwo'
import FormThree from '../../pages/FormThree/FormThree'
import FormFour from '../../pages/FormFour/FormFour'
import ThankYou from '../../pages/ThankYou/ThankYou'
import { useDispatch, useSelector } from 'react-redux'
import { saveFormOne } from '../../features/formOne/formOneSlice'
import { saveFormTwo } from '../../features/formTwo/formTwoSlice'
import {setCurrentTab, setTabStates } from '../../features/overallForm/overallFormSlice'
import { saveFormThree } from '../../features/formThree/formThreeSlice'
import { useFormik } from 'formik'
import { basicSchema } from '../../schemas'

export const FormContext = createContext()

function MobileLayout() {
  const dispatch = useDispatch()

  // A list of the form tab items
  const tabItems = [
    {name: 'One', value: '1'},
    {name: 'Two', value: '2'},
    {name: 'Three', value: '3'},
    {name: 'Four', value: '4'}
  ]
  // States from the store
  const currentTab = useSelector((state) => state.form.currentTab)
  const tabStates = useSelector((state) => state.form.tabStates)
  const formOneState = useSelector((state) => state.formOne)
  const formTwoState = useSelector((state) => state.formTwo)
  const formThreeState = useSelector((state) => state.formThree)

  const initialFormOneState = {
    name: formOneState.name,
    phoneNumber: formOneState.phoneNumber,
    emailAddress: formOneState.emailAddress
  }
  
  const initialFormTwoState = {
    planName: formTwoState.planName || null,
    price: formTwoState.price || null,
    planType: formTwoState.planType || null
  }

  const initialFormThreeState = formThreeState.addOns

  const [formOneData, setFormOneData] = useState(initialFormOneState)
  const [formTwoData, setFormTwoData] = useState(initialFormTwoState)
  const [formThreeData, setFormThreeData] = useState(initialFormThreeState)
  const [submitForm, setSubmitForm] = useState(false)
  
  // Handles which form tab is active
  const handleFormStateChange = (tabName) => {
    dispatch(setTabStates(tabName))
    dispatch(setCurrentTab(tabName))
  }

  useEffect(() => {
    handleFormStateChange('1')
  }, [])

  const handleFormMovement = (direction) => {
    let currentTabNumber = Number(currentTab)
    switch(direction) {
      case 'next':
        if(currentTabNumber === 1) {
          setSubmitForm(prevVal => !prevVal)
          if(Object.keys(errors).length) {
            break
          }
        }
        if(currentTabNumber === 2) {
          const values = Object.values(formTwoData)
          console.log('Values ->', values)
          const findEmpty = values.filter(item => item === null)
          console.log('Find Empty 1 =>', findEmpty)
          console.log('Find Empty 2 =>', !!findEmpty.length)
          if(!!findEmpty.length || !values.length) {
            break
          }
          dispatch(saveFormTwo(formTwoData))
        }
        if(currentTabNumber === 3) {
          dispatch(saveFormThree(formThreeData))
        }
        currentTabNumber++
        break
      case 'prev':
        currentTabNumber--
        break
      default:
        break
    }
    handleFormStateChange(currentTabNumber.toString())
  }

  const handleFormOneData = (data) => {
    setFormOneData({...data})
  }

  const handleFormTwoData = (data) => {
    setFormTwoData({...data})
  }

  const handleFormThreeData = (data) => {
    setFormThreeData(data)
  }

  const onSubmit = (values, actions) => {
    handleFormOneData(values)
    dispatch(saveFormOne(values))
  }

  // Use Formik for form state management
  const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting } = useFormik({
    initialValues: {
      name: formOneState.name,
      emailAddress: formOneState.phoneNumber,
      phoneNumber: formOneState.emailAddress
    },
    validationSchema: basicSchema,
    onSubmit
  })
  
  return (
    <FormContext.Provider value={formOneData}>
      <div className='mobile-layout-container'>
        <div className="tabs">
          { tabItems.map((item, index) => (
            <div className={tabStates[item.value] ? "tab-item fill" : "tab-item"} key={index} onClick={() => handleFormStateChange(item.value)}>{ item.value }</div>
          )) }
        </div>
        <div className="form-card">
          {tabStates[1] && 
            <FormOne 
              submitForm={submitForm}
              formikValues={values}
              formikHandleChange={handleChange}
              formikErrors={errors}
              formikTouched={touched}
              formikHandleSubmit={handleSubmit}
              formikHandleBlur={handleBlur}
              formikOnSubmit={onSubmit}
            />
          }
          {tabStates[2] && <FormTwo handleFormTwoData={handleFormTwoData}/>}
          {tabStates[3] && <FormThree handleFormThreeData={handleFormThreeData}/>}
          {tabStates[4] && <FormFour/>}
          {tabStates[5] && <ThankYou/>}
        </div>
        {Number(currentTab) <= 4 && 
          <div className="footer">
            <div className="left">
            {Number(currentTab) > 1 && <p className='go-back' onClick={() => handleFormMovement('prev')}>Go Back</p>}
            </div>
            <div className="right">
              <Button type="submit" btnText={Number(currentTab <= 3) ? "Next Step" : "Confirm"} handleOnClick={() => handleFormMovement('next')}/>
            </div>
          </div>
        }
      </div>
    </FormContext.Provider>
  )
}

export default MobileLayout