import { Component } from 'react'
import { Pagination } from 'antd'

import Buttons from '../buttons'
import Search from '../search/search'
import NothingFound from '../nothing-found'
import RatedMovies from '../rated'
import Spinner from '../spinner'
import ErrorIndicator from '../error-indicator'

import Mouvies from './../mouvies'
import MouvieService from './../../services/mouvie-service'

import './app.css'

export default class App extends Component {
	
  state = {
    url: 'https://api.themoviedb.org/3/search/movie?api_key=4d98c79e61832bdbf0b038abd07969a6&query=return',
    btnSearch: true,
    btnRated: false,
    mouvies: [],
    ratedMouvies: JSON.parse(localStorage.getItem('ratings')) || [],
    genres: [],
    loading: true,
    error: false,
    totalResults: 0,
    pageNumber: 1,
    searchResult: true
  }

  mouvieService = new MouvieService()

  updateMouvies = (url=this.state.url, page=1) => {
    this.mouvieService
      .getMouvies(url, page)
      .then(data => {
        if (data.results.length === 0) {
          this.setState({
            searchResult: false,
            mouvies: [],
            loading: false,
            totalResults: 0,
            pageNumber: page,
          })
        } else {
          this.setState({
            url: url,
            mouvies: data.results,
            loading: false,
            totalResults: data.total_results,
            pageNumber: page,
            searchResult: true
          })
        }
        
      })
      .catch(this.onError)
  }

  getButtonsState = (btnSearch, btnRated) => {
    this.setState({
      btnSearch: btnSearch,
      btnRated: btnRated,
    })
  }

  getGenres = () => {
    this.mouvieService
      .getGenres()
      .then(genres => {
        this.setState({genres})
      })
  }

  rememberRatedMouvies = (data) => {
    const idx = this.state.ratedMouvies.findIndex(item => item.id === data.id)

    let newItems = this.state.ratedMouvies

    if (idx !== -1) {
      newItems = [
        ...this.state.ratedMouvies.slice(0, idx),
        data,
        ...this.state.ratedMouvies.slice(idx + 1)
    		]	
    } else {
      newItems.push(data)
    }

    this.setState({
      ratedMouvies: newItems
		  })

    localStorage.setItem('ratings', JSON.stringify(newItems))
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false
    })
  }

  onChangePage = (count) => {
    this.updateMouvies(this.state.url, count)
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  componentDidMount() {
    this.updateMouvies()
    this.getGenres()
  }

  render() {
    const {mouvies, genres, ratedMouvies, loading, error, totalResults, pageNumber, searchResult} = this.state

    const hasData = !(loading || error)

    const errorMessage = error ? <ErrorIndicator /> : null
    const spinner = loading ? <Spinner /> : null

    const searched = (hasData && this.state.btnSearch)
    const rated = (this.state.btnRated)

    const search = !rated ? <Search updateMouvies={this.updateMouvies}/> : null

    const content = searched ? <Mouvies 
      mouvies={mouvies} 
      genres={genres}
      rememberRatedMouvies={this.rememberRatedMouvies}
      ratedMouvies={ratedMouvies}/> 
      : null
    const serchedResult = (!searchResult && !rated) ? <NothingFound /> : null

    const ratedContent = rated ? <RatedMovies  
      mouvies={ratedMouvies}
      genres={genres}
      ratedMouvies={ratedMouvies}
      rememberRatedMouvies={this.rememberRatedMouvies}/>
      : null


    const pagination = (hasData && !rated) ? <Pagination 
      
      total={totalResults} 
      pageSize={20} 
      showSizeChanger={false}
      style={{ display: 'flex', justifyContent: 'center', paddingBottom: '50px' }}
      onChange={(e) => this.onChangePage(e)}
      current={pageNumber}
    /> 
      : null

    return (
      <div className='app'>

        <Buttons getButtonsState={this.getButtonsState}/>

        {search}
        {serchedResult}
        {errorMessage}
        {spinner}
        {content}
        {ratedContent}
        {pagination}

      </div>
    )
  }	
}
