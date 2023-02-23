import './FormFour.scss'

function FormFour() {
  return (
    <div className='form-four-container'>
      <div className="text-section">
        <h1 className="title">Finishing up</h1>
        <p className="text">
          Double-check everything looks OK before confirming
        </p>
      </div>
      <div className="subscription-summary">
        <div className="main-subscription">
          <div className="sub-name-div">
            <p className="sub-name">Arcade(Monthly)</p>
            <a href="#" className='sub-type-change-link'>Change</a>
          </div>
          <div className="sub-price">$9/mo</div>
        </div>
        <hr className='horizontal-rule'/>
        <div className="addons-list">
          <div className="addon-item">
            <p className="addon-name">Online Service</p>
            <p className="addon-price">+$1/mo</p>
          </div>
          <div className="addon-item">
            <p className="addon-name">Larger Storage</p>
            <p className="addon-price">+$2/mo</p>
          </div>
        </div>
      </div>
      <div className="total-summary">
        <p className="total-text">Total (per month)</p>
        <p className="total-price">$12/mo</p>
      </div>
    </div>
  )
}

export default FormFour