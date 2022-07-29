import PropTypes from 'prop-types'
import { Component } from 'react'

import Mouvies from './../mouvies'

import './rated.css'

export default class RatedMovies extends Component {

  render() {
    const {mouvies, genres, rememberRatedMouvies, ratedMouvies} = this.props
        
    return (
      <div className="rated-movies">
        <h1 className="rated-movies__title">Rated Mouvies</h1>
              
        <Mouvies 
          mouvies={mouvies} 
          genres={genres}
          ratedMouvies={ratedMouvies}
          rememberRatedMouvies={rememberRatedMouvies}/>
      </div>
    )
  }
}

RatedMovies.propTypes = {
  mouvies: PropTypes.arrayOf(PropTypes.object).isRequired,
  genres: PropTypes.arrayOf(PropTypes.object).isRequired,
  rememberRatedMouvies: PropTypes.func.isRequired,
  ratedMouvies: PropTypes.array
}