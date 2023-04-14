import './FormFour.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getNumberFromStr } from '../../helpers/formatString'


function FormFour() {
  const formOneState = useSelector((state) => state.formOne)
  const formTwoState = useSelector((state) => state.formTwo)
  const formThreeState = useSelector((state) => state.formThree)
  const addOns = formThreeState.addOns
  const planType = formTwoState.planType
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const costOne = getNumberFromStr(formTwoState.price)
    const costTwo = addOns.reduce((acc, curr) => acc + getNumberFromStr(curr.price), 0)
    setTotal((prevValue) => costOne + costTwo)
  }, [])

  return (
    <div className='form-four-container'>
      <p>FORM 2 = {JSON.stringify(formTwoState)}</p>
      <p>FORM 3 = {JSON.stringify(formThreeState)}</p>
      <div className="text-section">
        <h1 className="title">Finishing up</h1>
        <p className="text">
          Double-check everything looks OK before confirming
        </p>
      </div>
      <div className="subscription-summary">
        <div className="main-subscription">
          <div className="sub-name-div">
            <p className="sub-name">{formTwoState.planName}({formTwoState.planType})</p>
            <a href="#" className='sub-type-change-link'>Change</a>
          </div>
          <div className="sub-price">{formTwoState.price}</div>
        </div>
        <hr className='horizontal-rule'/>
        <div className="addons-list">
          { addOns.map((item, index) => (
            <div className="addon-item" key={index}>
              <p className="addon-name">{item.title}</p>
              <p className="addon-price">{item.price}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="total-summary">
        <p className="total-text">Total (per month)</p>
        <p className="total-price">${total}/{planType === 'monthly' ? 'mo' : 'yr'}</p>
      </div>
    </div>
  )
}

export default FormFour