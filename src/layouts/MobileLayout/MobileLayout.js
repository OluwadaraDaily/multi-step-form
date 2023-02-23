import { useState, useEffect } from 'react'
import './MobileLayout.scss'
import Button from '../../components/Button/Button'
import FormOne from '../../pages/FormOne/FormOne'
import FormTwo from '../../pages/FormTwo/FormTwo'
import FormThree from '../../pages/FormThree/FormThree'
import FormFour from '../../pages/FormFour/FormFour'
import ThankYou from '../../pages/ThankYou/ThankYou'

function MobileLayout() {
  const initialTabState = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false
  }
  const tabItems = [
    {name: 'One', value: '1'},
    {name: 'Two', value: '2'},
    {name: 'Three', value: '3'},
    {name: 'Four', value: '4'}
  ]
  const [tabStates, setTabsStates] = useState(initialTabState)
  const [currentTab, setCurrentTab] = useState('1')

  const handleFormStateChange = (tabName) => {
    setTabsStates((prevState) => initialTabState)
    setTabsStates((prevState) => {
      prevState[tabName] = true
      return {...prevState}
    })
    setCurrentTab(tabName)
  }

  useEffect(() => {
    handleFormStateChange('4')
  }, [])

  const handleFormMovement = (direction) => {
    let currentTabNumber = Number(currentTab)
    switch(direction) {
      case 'next':
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
  return (
    <div className='mobile-layout-container'>
      <div className="tabs">
        { tabItems.map((item, index) => (
          <div className={tabStates[item.value] ? "tab-item fill" : "tab-item"} key={index} onClick={() => handleFormStateChange(item.value)}>{ item.value }</div>
        )) }
      </div>
      <div className="form-card">
        {tabStates[1] && <FormOne/>}
        {tabStates[2] && <FormTwo/>}
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
  )
}

export default MobileLayout