import './PlanItem.scss'
import { useState, forwardRef, useImperativeHandle, useEffect } from 'react'

const PlanItem = ({ planName, monthlyPrice, yearlyPrice, image, planType, selectPlan, selectedPlan }, ref) => {
  const [selected, setSelected] = useState(false)
  useEffect(() => {
    if(selectedPlan.planName === planName) {
      setSelected(true)
    } else {
      setSelected(false)
    }
  }, [selectedPlan])
  return (
    <div className={ selected ? 'plan-item-div selected':'plan-item-div'} onClick={() => selectPlan(planName, planType)}>
      <div className="plan-img">
        <img src={image} alt="" />
      </div>
      <div className='name-and-price'>
        <p className="plan-name">{ planName }</p>
        <p className="plan-price">{ planType === 'monthly' ? monthlyPrice : yearlyPrice }</p>
        {planType === 'yearly' && <p className="yearly-price-discount">2 months free</p>}
      </div>
    </div>
  )
}

export default PlanItem