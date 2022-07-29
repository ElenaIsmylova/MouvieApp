import PropTypes from 'prop-types'
import { Component } from 'react'
import { debounce } from 'lodash'

import './search.css'

export default class Search extends Component {

  debounceGetResponce = debounce(url => 
    this.props.updateMouvies(url, 1), 1000)

  onFormSubmit = (e) => {
    e.preventDefault()
  }
    
  onValueChange = (e) => {
    let value = e.target.value
    let url = `https://api.themoviedb.org/3/search/movie?api_key=4d98c79e61832bdbf0b038abd07969a6&query=${value}`
    if (value) {
      this.debounceGetResponce(url)
    } else {
      this.debounceGetResponce('https://api.themoviedb.org/3/search/movie?api_key=4d98c79e61832bdbf0b038abd07969a6&query=return')
    }
  }

  render() {

    return (
      <form className="search-form" onSubmit={this.onFormSubmit}>
        <input type="text" 
          className="search-input" 
          placeholder="Type to search..."
          onChange={this.onValueChange}/>
      </form>
    )
  }
}

Search.propTypes = {
  updateMouvies: PropTypes.func.isRequired,
}