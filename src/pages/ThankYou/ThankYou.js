import './ThankYou.scss'
import thankYouIcon from '../../images/icon-thank-you.svg'
function ThankYou() {
  return (
    <div className='thank-you-container'>
      <div className="thank-you-icon">
        <img src={thankYouIcon} alt="" />
      </div>
      <div className="thank-you-text-section">
        <p className="thank-you-title">Thank you!</p>
        <p className="thank-you-text">
          Thanks for confirming your subscription.
          We hope you have fun using our platform
          If you ever need support please feel free to
          email us at support@loremgaming.com
        </p>
      </div>
    </div>
  )
}

export default ThankYou