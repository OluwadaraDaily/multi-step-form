import { useState, useEffect, createContext, forwardRef } from 'react'
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
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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

  const [windowWidth, setwindowWidth] = useState(window.innerWidth)
  const [jumpError, setJumpError] = useState(false)
  const errorMessage = "Please don't jump ahead kindly go through the form, stage by stage with the button. You can jump backwards to forms you've filled. Thank you"
  
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleFormStateChange = (tabName, isBtnClicked = false) => {
    if(!isBtnClicked && Number(currentTab) < Number(tabName)) {
      setJumpError(true)
    }
    if(Number(currentTab) >= Number(tabName) || isBtnClicked) {
      dispatch(setTabStates(tabName))
      dispatch(setCurrentTab(tabName))
    }
  }

  // Initial form state
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    handleFormStateChange(currentTab, true)
    // eslint-disable-next-line
  }, [currentTab])

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
  const formContextData = {}

  // Handle close of snackbar
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setJumpError(false);
  };
  
  return (
    <FormContext.Provider value={formContextData}>
      <Snackbar open={jumpError} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
          <Typography variant='h6'>
            { errorMessage }
          </Typography>
        </Alert>
      </Snackbar>
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
                  <div className="tab-item-wrap" key={index} onClick={() => handleFormStateChange(item.value)}>
                    <div className={tabStates[item.value] ? "tab-item fill" : "tab-item"}>{ item.value }</div>
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