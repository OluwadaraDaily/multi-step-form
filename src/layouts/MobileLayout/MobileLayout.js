import './MobileLayout.scss'
import Button from '../../components/Button/Button'

function MobileLayout() {
  const tabItems = ['1', '2', '3', '4']
  return (
    <div className='mobile-layout-container'>
      <div className="tabs">
        { tabItems.map((item) => (
          <div className="tab-item">{ item }</div>
        )) }
      </div>
      <div className="form-card">

      </div>
      <div className="footer">
        <Button btnText="Next Step" />
      </div>
    </div>
  )
}

export default MobileLayout