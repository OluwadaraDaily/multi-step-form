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

  const initialFormOneState = {
    name: formOneState.name,
    phoneNumber: formOneState.phoneNumber,
    emailAddress: formOneState.emailAddress
  }
  const initialFormTwoState = {
    planName: formTwoState.planName,
    price: formTwoState.price,
    planType: formTwoState.planType
  }
  const [formOneData, setFormOneData] = useState(initialFormOneState)
  const [formTwoData, setFormTwoData] = useState(initialFormTwoState)
  
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
          dispatch(saveFormOne(formOneData))
        }
        if(currentTabNumber === 2) {
          dispatch(saveFormTwo(formTwoData))
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
  
  return (
    <FormContext.Provider value={formOneData}>
      <div className='mobile-layout-container'>
        <div className="tabs">
          { tabItems.map((item, index) => (
            <div className={tabStates[item.value] ? "tab-item fill" : "tab-item"} key={index} onClick={() => handleFormStateChange(item.value)}>{ item.value }</div>
          )) }
        </div>
        <pre>{ JSON.stringify(formOneState) }</pre>
        <div className="form-card">
          {tabStates[1] && <FormOne handleFormOneData={handleFormOneData}/>}
          {tabStates[2] && <FormTwo handleFormTwoData={handleFormTwoData}/>}
          {tabStates[3] && <FormThree/>}
          {tabStates[4] && <FormFour/>}
          {tabStates[5] && <ThankYou/>}
        </div>
        {Number(currentTab) <= 4 && 
          <div className="footer">
            <div className="left">
            {Number(currentTab) > 1 && <p className='go-back' onClick={() => handleFormMovement('prev')}>Go Back</p>}
            </div>
            <div className="right">
              <Button btnText={Number(currentTab <= 3) ? "Next Step" : "Confirm"} handleOnClick={() => handleFormMovement('next')}/>
            </div>
          </div>
        }
      </div>
    </FormContext.Provider>
  )
}

export default MobileLayout