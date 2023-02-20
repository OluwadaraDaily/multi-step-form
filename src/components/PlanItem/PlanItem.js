import './PlanItem.scss'

function PlanItem({ planName, price, image }) {
  return (
    <div className='plan-item-div'>
      <div className="plan-img">
        <img src={image} alt="" />
      </div>
      <div className='name-and-price'>
        <p className="plan-name">{ planName }</p>
        <p className="plan-price">{ price }</p>
      </div>
    </div>
  )
}

export default PlanItem