import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'

class JobCard extends Component {
  state = {
    apiResult: {},
  }

  componentDidMount() {
    this.getSpecificJobCard()
  }

  getSpecificJobCard = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      this.setState({apiResult: data})
    }
  }

  render() {
    const {match} = this.props
    const {params} = match
    const {id} = params
    return (
      <div>
        <Header />
        <div>
          <h1>This is Jobs Card</h1>
        </div>
      </div>
    )
  }
}

export default JobCard
