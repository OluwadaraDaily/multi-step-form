import './FormTwo.scss'
import PlanItem from '../../components/PlanItem/PlanItem'
import arcadeImage from '../../images/icon-arcade.svg'
import advancedImage from '../../images/icon-advanced.svg'
import proImage from '../../images/icon-pro.svg'

function FormTwo() {
  const plans = [
    {
      planName: "Arcade",
      price: "$9/mo",
      image: arcadeImage
    },
    {
      planName: "Advanced",
      price: "$12/mo",
      image: advancedImage
    },
    {
      planName: "Pro",
      price: "$15/mo",
      image: proImage
    },
  ]
  return (
    <div className='form-two-container'>
      <div className="text-section">
        <h1 className="title">Select your plan</h1>
        <p className="text">
          You have the option of monthly or yearly billing
        </p>
      </div>
      <div className="plans-section">
        {plans.map((item) => (
          <PlanItem planName={item.planName} price={item.price} image={item.image}/>
        ))}
      </div>
    </div>
  )
}

export default FormTwo