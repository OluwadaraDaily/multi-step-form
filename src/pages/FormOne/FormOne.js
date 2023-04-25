import './FormOne.scss'
import FormInput from '../../components/FormInput/FormInput'
import { useFormik } from 'formik'
import { basicSchema } from '../../schemas'
import Button from '../../components/Button/Button'

function FormOne(props) {

  const {   
    initialValues,
    submitStageData,
    handleFormMovement
  } = props

  // Use Formik for form state management
  const onSubmit = (values) => {
    submitStageData(values)
    handleFormMovement('next', values)
  }

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: basicSchema,
    onSubmit
  })


  return (
    <form id='form' onSubmit={handleSubmit}>
      <div className='form-one-container'>
        <div className="text-section">
          <h1 className="title">Personal Info</h1>
          <p className="text">
            Please provide your name, email address, and phone number.
          </p>
        </div>
        <div className="form-section">
          <FormInput label="Name" id="name" placeholder="e.g. Stephen King" onChange={handleChange} value={values.name} errors={errors} touched={touched} handleOnBlur={handleBlur} />
          <FormInput label="Email Address" id="emailAddress" placeholder="e.g. stephenking@lorem.com" onChange={handleChange} value={values.emailAddress} errors={errors} touched={touched} handleOnBlur={handleBlur} />
          <FormInput label="Phone Number" id="phoneNumber" placeholder="e.g. +234 810 121 7017" onChange={handleChange} value={values.phoneNumber} errors={errors} touched={touched} handleOnBlur={handleBlur} />
          <div className="footer">
            <div className="left" style={{ display: 'none' }}>
              <p className='go-back' onClick={() => handleFormMovement('prev')}>Go Back</p>
            </div>
            <div className="right">
              <Button type="submit" btnText="Next Step"/>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default FormOne