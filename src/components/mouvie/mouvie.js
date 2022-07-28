import PropTypes from 'prop-types'
import { Component } from 'react'
import { format } from 'date-fns'
import { Rate } from 'antd'

import Genre from '../genre'
import './mouvie.css'

export default class Mouvie extends Component {
    
  cutOverview = (text, limit=150) => {
    text = text.trim()
    if (text.length <= limit) return text
    text = text.slice( 0, limit) 
    let lastSpace = text.lastIndexOf(' ')
    if (lastSpace > 0) {
      text = text.substr(0, lastSpace)
    }
    return `${text}...`
  }

  onHandleChangeRate = (stars) => {
    const {id, title, releaseDate, genreIds, overview, posterPath, voteAverage, rememberRatedMouvies} = this.props
        
    const rate = {
      id: id,
      title: title,
      release_date: releaseDate,
      genre_ids: genreIds,
      overview: overview,
      poster_path: posterPath,
      vote_average: voteAverage,
      stars: stars
    }
    rememberRatedMouvies(rate)
  }

  render() {
    const {stars, title, releaseDate, genres, overview, posterPath, voteAverage} = this.props

    const genreItems = genres.map((elem, ind) => {
      return <Genre key={ind} genre={elem} />
    })

    let ratingClass = 'mouvie__rating'
    if(voteAverage <= 3) {
      ratingClass += ' red'
    } else if(voteAverage <= 5) {
      ratingClass += ' orange'
    } else if(voteAverage <= 7) {
      ratingClass += ' yellow'
    } else {
      ratingClass += ' green'
    }

    let time
    try {
      time = format(new Date(releaseDate), 'MMMM dd, yyyy')
    } catch {
      time = 'No release date has been set'
    }

    const rating = stars ? <Rate
      className="movie-rate"
      style={{ fontSize: 15 }}
      count={10}
      value={stars}
    />
      : <Rate
        className="movie-rate"
        style={{ fontSize: 15 }}
        count={10}
        onChange={this.onHandleChangeRate}
      />

    return (
      <li className='mouvie'>
        <img src={posterPath} className='mouvie__img' alt={title} title={title}/>
        <div className='mouvie__column'>
          <div className='mouvie__title-wrapper'>
            <h3 className='mouvie__title'>{title}</h3>
            <div className={ratingClass}>{voteAverage}</div>
          </div>
                    
          <h5 className='mouvie__release-date'>{time}</h5>
          <div className='mouvie__genres'>
            {genreItems}
          </div>
          <p className='mouvie__overview'>{this.cutOverview(overview)}</p>
          {rating}
        </div>
      </li>
    )
  }
}

Mouvie.propTypes = {
  id: PropTypes.number,
  stars: PropTypes.number,
  title: PropTypes.string.isRequired,
  releaseDate: PropTypes.string,
  genreIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  overview: PropTypes.string.isRequired,
  posterPath: PropTypes.string.isRequired,
  voteAverage: PropTypes.number,
  rememberRatedMouvies: PropTypes.func.isRequired,
}