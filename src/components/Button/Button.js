import './Button.scss'

function Button({ btnText, disabled = false, handleOnClick }) {
  return (
    <>
      <button className='btn' disabled={disabled} onClick={handleOnClick}>{ btnText }</button>
    </>
  )
}

export default Button