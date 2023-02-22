import './FormTwo.scss'
import PlanItem from '../../components/PlanItem/PlanItem'
import arcadeImage from '../../images/icon-arcade.svg'
import advancedImage from '../../images/icon-advanced.svg'
import proImage from '../../images/icon-pro.svg'
import Switch from '../../components/Switch/Switch'
import { useState } from 'react'

function FormTwo() {
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
      yearlyPrice: "120/yr",
      image: advancedImage
    },
    {
      planName: "Pro",
      monthlyPrice: "$15/mo",
      yearlyPrice: "$150/yr",
      image: proImage
    },
  ]
  const [switchValue, setSwitchValue] = useState(false)
  const [planType, setPlanType] = useState('monthly')
  const handleSwitchOnClick = () => {
    setSwitchValue(prevValue => !prevValue)
    setPlanType(prevValue => {
      if (prevValue === 'monthly') {
        return 'yearly'
      }
      return 'monthly'
    })
  }
  return (
    <div className='form-two-container'>
      <div className="text-section">
        <h1 className="title">Select your plan</h1>
        <p className="text">
          You have the option of monthly or yearly billing
        </p>
      </div>
      <div className="plans-section">
        {plans.map((item, index) => (
          <PlanItem key={index} planName={item.planName} monthlyPrice={item.monthlyPrice} yearlyPrice={item.yearlyPrice} image={item.image} planType={planType}/>
        ))}
      </div>
      <div className="plan-switch">
        <Switch handleOnClick={handleSwitchOnClick}  switchValue={switchValue}/>
      </div>
    </div>
  )
}

export default FormTwo