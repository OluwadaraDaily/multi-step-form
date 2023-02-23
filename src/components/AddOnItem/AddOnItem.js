import './AddOnItem.scss'
// import { blue } from '@mui/material/colors';
// import Checkbox from '@mui/material/Checkbox';
import Checkbox from '../Checkbox/Checkbox';


function AddOnItem({ title, subTitle, monthlyPrice, yearlyPrice, planType = 'monthly' }) {
  const label = { inputProps: { 'aria-label': 'Checkbox' } };
  return (
    <div className='addon-item-div'>
    <div className="left">
      <Checkbox/>
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