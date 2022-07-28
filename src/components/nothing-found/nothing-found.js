import { Component } from 'react'
import { Alert } from 'antd'
import './nothing-found.css'

export default class NothingFound extends Component {

  render() {
    return (
      <div className="nothing-found">
        <Alert message="Nothing found for your request" type="info" />
      </div>
    )
  }
}