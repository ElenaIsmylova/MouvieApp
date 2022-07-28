import PropTypes from 'prop-types'
import { Component } from 'react'
import './genre.css'

export default class Genre extends Component {

  render() {
    const {genre} = this.props
    return (
      <span className='mouvie__genre'>{genre}</span>
    )
  }
}

Genre.propTypes = {
  genre: PropTypes.string.isRequired
}