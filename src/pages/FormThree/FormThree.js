import './FormThree.scss'
import AddOnItem from '../../components/AddOnItem/AddOnItem'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import Button from '../../components/Button/Button'

function FormThree({ initialValues, handleFormMovement, submitStageData }) {
  const { planType } = useSelector((state) => state.formTwo)
  const addOnItems = [
    {
      title: 'Online Service',
      subTitle: 'Access to multiplayer games',
      monthlyPrice: '+$1/mo',
      yearlyPrice: '+$10/yr'
    },
    {
      title: 'Larger Storage',
      subTitle: 'Extra 1TB of cloud save',
      monthlyPrice: '+$2/mo',
      yearlyPrice: '+$20/yr'
    },
    {
      title: 'Customizable Profile',
      subTitle: 'Custom theme on your profile',
      monthlyPrice: '+$2/mo',
      yearlyPrice: '+$20/yr'
    }
  ]
  const initialSelectedAddOns = initialValues?.addOns || []
  const [selectedAddOns, setSelectedAddOns] = useState(initialSelectedAddOns)

  const handleOnClick = (title, planType) => {
    setSelectedAddOns((prevState) => {
      let dupState = [...prevState]
      if(dupState.find(item => item.title === title)) {
        const index = dupState.indexOf(dupState.find(item => item.title === title))
        dupState.splice(index, 1)
        return dupState
      }
      const addOnItem = addOnItems.find(item => item.title === title)
      let selectedItem = {
        title: addOnItem.title,
        subTitle: addOnItem.subTitle,
        price: planType === 'yearly' ? addOnItem.yearlyPrice : addOnItem.monthlyPrice
      }
      dupState.push(selectedItem)
      return dupState
    })
  }

  const submitForm = () => {
    submitStageData({ addOns: selectedAddOns })
    handleFormMovement('next', { addOns: selectedAddOns })
  }

  return (
    <div className='form-three-container'>
      <div className="text-section">
        <h1 className="title">Pick add-ons</h1>
        <p className="text">
          Add-ons help enhance your gaming experience
        </p>
      </div>
      <div className="addons-section">
        { addOnItems.map((item, index) => (
          <AddOnItem 
            key={index} 
            title={item.title} 
            subTitle={item.subTitle} 
            monthlyPrice={item.monthlyPrice} 
            yearlyPrice={item.yearlyPrice}
            handleOnClick={handleOnClick}
            planType={planType}
            selectedAddOns={selectedAddOns}
          />
        ))}
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

export default FormThree