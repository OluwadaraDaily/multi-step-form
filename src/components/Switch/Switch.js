import './Switch.scss'

function Switch({ handleOnClick, switchValue }) {
  return (
    <div className='switch-div' onClick={handleOnClick}>
      <div className="left-item">
        <p className="switch-item-text">Monthly</p>
      </div>
      <div className="switch-icon">
        <div className={switchValue ? "switch go-right" : "switch go-left"}></div>
      </div>
      <div className="right-item">
        <p className="switch-item-text">Yearly</p>
      </div>
    </div>
  )
}

export default Switch