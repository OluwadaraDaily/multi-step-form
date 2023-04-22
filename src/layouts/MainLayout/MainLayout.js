import { useState, useEffect, createContext } from 'react'
import './MainLayout.scss'
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

export const FormContext = createContext()

function MainLayout() {
  const dispatch = useDispatch()

  // A list of the form tab items
  const tabItems = [
    {name: 'One', value: '1', stepTitle: 'Your Info', tag: 'your-info'},
    {name: 'Two', value: '2', stepTitle: 'Select Plan', tag: 'select-plan'},
    {name: 'Three', value: '3', stepTitle: 'Add-Ons', tag: 'add-ons'},
    {name: 'Four', value: '4', stepTitle: 'Summary', tag: 'summary'}
  ]

  // States from the store
  const currentTab = Number(useSelector((state) => state.form.currentTab))
  const tabStates = useSelector((state) => state.form.tabStates)
  const formOneState = useSelector((state) => state.formOne)
  const formTwoState = useSelector((state) => state.formTwo)
  const formThreeState = useSelector((state) => state.formThree)

  // Initial form States
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
  const [windowWidth, setwindowWidth] = useState(window.innerWidth)
  
  // Use Effect Hooks
  useEffect(() => {
    window.addEventListener('resize', handleWindowResize)
    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [windowWidth])
  
  // Handles change in layout size 
  const handleWindowResize = () => {
    setwindowWidth(window.innerWidth)
  }

  // Handles which form tab is active
  const handleFormStateChange = (tabName, isBtnClicked = false) => {
    if(Number(currentTab) >= Number(tabName) || isBtnClicked) {
      dispatch(setTabStates(tabName))
      dispatch(setCurrentTab(tabName))
    }
  }

  // Initial form state
  useEffect(() => {
    handleFormStateChange(currentTab)
  }, [])

  // Handles Form Movement
  const handleFormMovement = (direction, levelData) => {
    let currentTabNumber = Number(currentTab)
    switch(direction) {
      case 'next':
        if(currentTabNumber === 1) {
          dispatch(saveFormOne(levelData))
        }
        if(currentTabNumber === 2) {
          dispatch(saveFormTwo(levelData))
        }
        if(currentTabNumber === 3) {
          dispatch(saveFormThree(levelData))
        }
        currentTabNumber++
        break
      case 'prev':
        currentTabNumber--
        break
      default:
        break
    }
    handleFormStateChange(currentTabNumber.toString(), true)
  }

  // State for all form stages
  const [stageData, setStageData] = useState({
    '1': {
      name: formOneState.name,
      emailAddress: formOneState.phoneNumber,
      phoneNumber: formOneState.emailAddress
    },
    '2': {
      planName: formTwoState.planName,
      planType: formTwoState.planType,
      price: formTwoState.price
    },
    '3': {
      addOns: formThreeState.addOns
    },
    '4': {}
    })

  const submitIndividualStageData = (stage, data) => {
    setStageData({
      ...stageData,
      [stage]: data
    })
  }

  // Form context data
  const formContextData = {
    isFormOneSubmitted: submitForm,
  }
  
  return (
    <FormContext.Provider value={formContextData}>
    { 
      (windowWidth <= 768 && windowWidth >= 320 ) &&  
      <div className='mobile-layout-container'>
        <div className="tabs">
          { tabItems.map((item, index) => (
            <div className={tabStates[item.value] ? "tab-item fill" : "tab-item"} key={index} onClick={() => handleFormStateChange(item.value)}>{ item.value }</div>
          )) }
        </div>
        <div className="form-card">
          {tabStates[1] && 
            <FormOne 
              initialValues ={stageData['1']}
              submitStageData={(values) => submitIndividualStageData('1', values)}
              handleFormMovement={handleFormMovement}
            />
          }
          {tabStates[2] && 
            <FormTwo 
              initialValues={stageData['2']}
              handleFormMovement={handleFormMovement}
              submitStageData={(values) => submitIndividualStageData('2', values)}
            />
          }
          {tabStates[3] && 
            <FormThree
              initialValues={stageData['3']}
              handleFormMovement={handleFormMovement}
              submitStageData={(values) => submitIndividualStageData('3', values)}
            />
          }
          {tabStates[4] && <FormFour handleFormMovement={handleFormMovement}/>}
          {tabStates[5] && <ThankYou/>}
        </div>
      </div>
    }
    {  
      (windowWidth > 768) && 
      <div className="desktop-layout-container">
        <div className="main-form">
          <div className="sidebar">
            <div className="tabs">
              { tabItems.map((item, index) => (
                <div className="tab-item-wrap" key={index}>
                  <div className={tabStates[item.value] ? "tab-item fill" : "tab-item"} onClick={() => handleFormStateChange(item.value)}>{ item.value }</div>
                  <div className="tab-item-info">
                    <p className='title'>Step {item.name}</p>
                    <p className='subTitle'>{item.stepTitle}</p>
                  </div>
                </div>
              )) }
            </div>
          </div>
          <div className="form-section">
            <div className="forms">
              {tabStates[1] && 
                <FormOne 
                  initialValues ={stageData['1']}
                  submitStageData={(values) => submitIndividualStageData('1', values)}
                  handleFormMovement={handleFormMovement}
                />
              }
              {
                tabStates[2] && 
                <FormTwo
                  initialValues={stageData['2']}
                  handleFormMovement={handleFormMovement}
                  submitStageData={(values) => submitIndividualStageData('2', values)}
                />
              }
              {
                tabStates[3] && 
                <FormThree
                  initialValues={stageData['3']}
                  handleFormMovement={handleFormMovement}
                  submitStageData={(values) => submitIndividualStageData('3', values)}
                />
              }
              {tabStates[4] && <FormFour handleFormMovement={handleFormMovement}/>}
              {tabStates[5] && <ThankYou/>}
            </div>
          </div>
        </div>
      </div>
    }
    </FormContext.Provider>
  )
}

export default MainLayout