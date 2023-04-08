import './FormThree.scss'
import AddOnItem from '../../components/AddOnItem/AddOnItem'

function FormThree() {
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
          <AddOnItem key={index} title={item.title} subTitle={item.subTitle} monthlyPrice={item.monthlyPrice}  yearlyPrice={item.yearlyPrice} />
        ))}
      </div>
    </div>
  )
}

export default FormThree