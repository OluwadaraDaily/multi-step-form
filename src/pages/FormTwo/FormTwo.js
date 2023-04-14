import './FormTwo.scss'
import PlanItem from '../../components/PlanItem/PlanItem'
import arcadeImage from '../../images/icon-arcade.svg'
import advancedImage from '../../images/icon-advanced.svg'
import proImage from '../../images/icon-pro.svg'
import Switch from '../../components/Switch/Switch'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

function FormTwo({ handleFormTwoData }) {
  const plans = [
    {
      planName: "Arcade",
      monthlyPrice: "$9/mo",
      yearlyPrice: "$90/yr",
      image: arcadeImage
    },
    {
      planName: "Advanced",
      monthlyPrice: "$12/mo",
      yearlyPrice: "$120/yr",
      image: advancedImage
    },
    {
      planName: "Pro",
      monthlyPrice: "$15/mo",
      yearlyPrice: "$150/yr",
      image: proImage
    },
  ]
  // Form two state from the store
  const formTwoState = useSelector((state) => state.formTwo)
  const selectedPlanInitialState = {
    planName: formTwoState.planName,
    planType: formTwoState.planType,
    price: formTwoState.price
  }
  const initialPlanType = formTwoState.planType || 'monthly'
  let initialSwitchValue
  if(initialPlanType === 'yearly') {
    initialSwitchValue = true
  } else {
    initialSwitchValue = false
  }
  
  const [switchValue, setSwitchValue] = useState(initialSwitchValue)
  const [planType, setPlanType] = useState(initialPlanType)
  const [selectedPlan, setSelectedPlan] = useState(selectedPlanInitialState)
  
  const handleSwitchOnClick = () => {
    setSwitchValue(prevValue => !prevValue)
    setSelectedPlan({})
    setPlanType(prevValue => {
      if (prevValue === 'monthly') {
        return 'yearly'
      }
      return 'monthly'
    })
  }

  const selectPlan = (name, type) => {
    const plan = plans.find(item => item.planName === name)
    setSelectedPlan({})
    setSelectedPlan(prevValue => {
      let selectedPlan = {}
      selectedPlan.planName = plan.planName
      selectedPlan.planType = planType
      if(planType === 'monthly') {
        selectedPlan.price = plan.monthlyPrice
      } else {
        selectedPlan.price = plan.yearlyPrice
      }
      return {...selectedPlan}
    })
  }

  // Send data to layout
  useEffect(() => {
    handleFormTwoData(selectedPlan)
  }, [selectedPlan])

  return (
    <div className='form-two-container'>
      <div className="text-section">
        <h1 className="title">Select your plan</h1>
        <p className="text">
          You have the option of monthly or yearly billing
        </p>
      </div>
      <div className="plans-section">
        <pre>{JSON.stringify(selectedPlan)}</pre>
        {plans.map((item, index) => (
          <PlanItem
            key={index} 
            index={index}
            planName={item.planName} 
            monthlyPrice={item.monthlyPrice} 
            yearlyPrice={item.yearlyPrice} 
            image={item.image} 
            planType={planType}
            selectPlan={selectPlan}
            selectedPlan={selectedPlan}
          />
        ))}
      </div>
      <div className="plan-switch">
        <Switch handleOnClick={handleSwitchOnClick}  switchValue={switchValue}/>
      </div>
    </div>
  )
}

export default FormTwo