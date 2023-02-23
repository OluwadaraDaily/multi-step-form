import './FormOne.scss'
import FormInput from '../../components/FormInput/FormInput'

function FormOne() {
  return (
    <div className='form-one-container'>
      <div className="text-section">
        <h1 className="title">Personal Info</h1>
        <p className="text">
          Please provide your name, email address, and phone number.
        </p>
      </div>
      <div className="form-section">
        <FormInput label="Name" placeholder="e.g. Stephen King" />
        <FormInput label="Email Address" placeholder="e.g. stephenking@lorem.com" />
        <FormInput label="Phone Number" placeholder="e.g. +234 810 121 7017" />
      </div>
    </div>
  )
}

export default FormOne