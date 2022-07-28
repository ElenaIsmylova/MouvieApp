import { Alert } from 'antd'
import './error-indicator.css'

const ErrorIndicator = () => (
  <div className='error-message'>
    <Alert message="Something has gone wrong! But we're already fixing it!" type="error" />
  </div>
)

export default ErrorIndicator
