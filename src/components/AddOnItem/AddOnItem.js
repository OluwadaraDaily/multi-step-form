import './AddOnItem.scss'
import Checkbox from '../Checkbox/Checkbox';
import { useEffect, useState } from 'react';


function AddOnItem({ title, subTitle, monthlyPrice, yearlyPrice, planType = 'monthly', handleOnClick, selectedAddOns }) {
  const [checked, setChecked] = useState(false)
  useEffect(() => {
    if(selectedAddOns.find(item => item.title === title)) {
      setChecked(true)
    } else {
      setChecked(false)
    }
  }, [selectedAddOns, title])
  return (
    <div className='addon-item-div' onClick={() => handleOnClick(title, planType)}>
    <div className="left">
      <Checkbox checked={checked}/>
      <div className="addon-item-text-section">
        <p className="addon-item-title">{ title }</p>
        <p className="addon-item-subtitle">{ subTitle }</p>
      </div>
    </div>
      <div className="addon-item-price-section">
        { planType === 'monthly' && <p className="addon-price-text">{ monthlyPrice }</p> }
        { planType === 'yearly' && <p className="addon-price-text">{ yearlyPrice }</p> }
      </div>
    </div>
  )
}

export default AddOnItem