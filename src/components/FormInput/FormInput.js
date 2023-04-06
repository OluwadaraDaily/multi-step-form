import './FormInput.scss'

function FormInput({ label, type = 'text', placeholder, onChange, value}) {
  return (
    <div className='form-input'>
      <label className='label'>{ label }</label> <br />
      <input type={type} placeholder={placeholder} onChange={onChange} value={value} />
    </div>
  )
}

export default FormInput