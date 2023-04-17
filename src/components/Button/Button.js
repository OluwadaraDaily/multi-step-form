import './Button.scss'

function Button({ btnText, disabled = false, handleOnClick, type = 'button' }) {
  return (
    <>
      <button type={type} className='btn' disabled={disabled} onClick={handleOnClick}>{ btnText }</button>
    </>
  )
}

export default Button