import PropTypes from 'prop-types'
import { Component } from 'react'

import './buttons.css'

export default class Buttons extends Component {

  state = {
    active: true
  }

  activeButton = () => {
    const {getButtonsState} = this.props
    const {active} = this.state
    let btn1 = !this.state.active
    let btn2 = this.state.active
        
    this.setState({
      active: !active
    })
        
    getButtonsState(btn1, btn2)
  }

  render() {

    const {active} = this.state
    let btn1, btn2
    if(active) {
      btn1 = 'btn btn-search active'
      btn2 = 'btn btn-rated'
    } else {
      btn1 = 'btn btn-search'
      btn2 = 'btn btn-rated active'
    }
    return (
      <div className="buttons-wrapper">
                
        <button className={btn1} onClick={this.activeButton}>Search</button>
        <button className={btn2} onClick={this.activeButton}>Rated</button>

      </div>
    )
  }
}

Buttons.propTypes = {
  getButtonsState: PropTypes.func.isRequired,
}