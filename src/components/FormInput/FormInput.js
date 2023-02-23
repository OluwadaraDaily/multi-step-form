import './FormInput.scss'

function FormInput({ label, type = 'text', placeholder }) {
  return (
    <div className='form-input'>
      <label className='label'>{ label }</label> <br />
      <input type={type} placeholder={placeholder} />
    </div>
  )
}

export default FormInput