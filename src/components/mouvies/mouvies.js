import PropTypes from 'prop-types'
import { Component } from 'react'

import Mouvie from './../mouvie'

import './mouvies.css'

export default class Mouvies extends Component {

  render() {
    const {mouvies, genres, rememberRatedMouvies} = this.props
    const elements = mouvies.map(mouvie => {

      let thisMouvieGenres = []
      for (let value of mouvie.genre_ids) {
        genres.forEach(elem => {
          if(elem.id === value) {
            thisMouvieGenres.push(elem.name)
          }
        })
      }
      let posterPath = mouvie.poster_path
      if (posterPath) {
        posterPath = `https://image.tmdb.org/t/p/w500${posterPath}`
      } else {
        posterPath = 'https://pbs.twimg.com/media/DxgelEwX0AEWvxa.jpg'
      }

      return <Mouvie key={mouvie.id}
        id={mouvie.id}
        title={mouvie.title}
        releaseDate={mouvie.release_date}
        genreIds={mouvie.genre_ids}
        genres={thisMouvieGenres}
        overview={mouvie.overview}
        posterPath={posterPath}
        voteAverage={mouvie.vote_average}
        stars={mouvie.stars}
        rememberRatedMouvies={rememberRatedMouvies} />
    })

    return (
      <ul className='mouvies'>
        {elements}
      </ul>
    )
  }
}

Mouvies.propTypes = {
  mouvies: PropTypes.arrayOf(PropTypes.object).isRequired,
  genres: PropTypes.arrayOf(PropTypes.object).isRequired,
  rememberRatedMouvies: PropTypes.func.isRequired,
    
}