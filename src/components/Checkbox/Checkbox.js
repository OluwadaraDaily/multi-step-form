import './Checkbox.scss'
import CheckIcon from '@mui/icons-material/Check';

function Checkbox({ checked = false }) {
  return (
    <div className='checkbox' style={{ backgroundColor: checked ? '#000' : '#fff' }}>
      <CheckIcon className='check-icon'/>
    </div>
  )
}

export default Checkbox