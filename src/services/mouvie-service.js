export default class MouvieService {

  async getResource(url) {
    const res = await fetch(url)

    if (!res.ok) {
      throw new Error(`Could not fetch ${this._apiBase}${url}, received ${res.status}`)
    }

    const body = await res.json()
    return body
  }

  async getMouvies(url, page=1) {
    const allMouvies = `${url}&page=${page}`
    const results = await this.getResource(allMouvies)
    return results
  }

  async getGenres() {
    const genresURL = `https://api.themoviedb.org/3/
								genre/movie/list?
								api_key=4d98c79e61832bdbf0b038abd07969a6`
    const {genres} = await this.getResource(genresURL)
    return genres
  }
}