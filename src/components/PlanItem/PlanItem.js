import './PlanItem.scss'

function PlanItem({ planName, monthlyPrice, yearlyPrice, image, planType }) {
  return (
    <div className='plan-item-div'>
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