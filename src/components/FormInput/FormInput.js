import './FormInput.scss'

function FormInput({ label, type = 'text', placeholder, onChange, value, id, errors, touched, handleOnBlur}) {
  return (
    <div className='form-input'>
      <label className='label'>{ label }</label> <br />
      <input type={type} placeholder={placeholder} onChange={onChange} value={value} id={id ? id : ''} className={!!errors[id] && !!touched[id] ? 'error-input' : ''} onBlur={handleOnBlur} />
      {errors[id] && touched[id] && <p className='error'>{ errors[id] }</p>}
    </div>
  )
}

export default FormInput