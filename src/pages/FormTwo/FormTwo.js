import './FormTwo.scss'
import PlanItem from '../../components/PlanItem/PlanItem'
import arcadeImage from '../../images/icon-arcade.svg'
import advancedImage from '../../images/icon-advanced.svg'
import proImage from '../../images/icon-pro.svg'
import Switch from '../../components/Switch/Switch'
import { useState, forwardRef } from 'react'
import Button from '../../components/Button/Button'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function FormTwo({ initialValues, handleFormMovement, submitStageData }) {
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
  const initialPlanType = initialValues?.planType || 'monthly'
  let initialSwitchValue
  if(initialPlanType === 'yearly') {
    initialSwitchValue = true
  } else {
    initialSwitchValue = false
  }
  
  const [switchValue, setSwitchValue] = useState(initialSwitchValue)
  const [planType, setPlanType] = useState(initialPlanType)
  const [selectedPlan, setSelectedPlan] = useState(initialValues)
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')
  
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
    setSelectedPlan(() => {
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

  const submitForm = () => {
    if(!Object.keys(selectedPlan).length || !!Object.values(selectedPlan).filter(item => item === null).length) {
      setErrorMessage('Please select a plan')
      setOpen(true)
      return;
    }
    submitStageData(selectedPlan)
    handleFormMovement('next', selectedPlan)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div className='form-two-container'>
      <div className="text-section">
        <h1 className="title">Select your plan</h1>
        <p className="text">
          You have the option of monthly or yearly billing
        </p>
      </div>
      <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
          <Typography variant='h6'>
            { errorMessage }
          </Typography>
        </Alert>
      </Snackbar>
      <div className="plans-section">
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
      <div className="footer">
        <div className="left">
          <p className='go-back' onClick={() => handleFormMovement('prev')}>Go Back</p>
        </div>
        <div className="right">
          <Button type="submit" btnText="Next Step" handleOnClick={() => submitForm()}/>
        </div>
      </div>
    </div>
  )
}

export default FormTwo