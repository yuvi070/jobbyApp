import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaSearch} from 'react-icons/fa'
import JobItemCard from '../JobItemCard'
import EmploymentType from '../EmploymentType'
import Header from '../Header'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]
const apiConstant = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
class Jobs extends Component {
  state = {
    jobsList: [],
    profileData: [],
    employeType: [],
    apiStatus1: apiConstant.initial,
    apiStatus2: apiConstant.initial,
    salaryRange: '',
  }

  componentDidMount() {
    this.getProfile()
    this.getJobsList()
  }

  getProfile = async () => {
    this.setState({apiStatus1: apiConstant.progress})
    const token = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const data2 = data.profile_details
      const updatedData = {
        name: data2.name,
        profileImageUrl: data2.profile_image_url,
        shortBio: data2.short_bio,
      }
      this.setState({profileData: updatedData, apiStatus1: apiConstant.success})
    } else {
      this.setState({apiStatus1: apiConstant.failure})
    }
  }

  getJobsList = async () => {
    this.setState({apiStatus2: apiConstant.progress})
    const {employeType, salaryRange} = this.state
    const token = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employeType.join()}&minimum_package=${salaryRange}&search=`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))

      this.setState({jobsList: updatedData, apiStatus2: apiConstant.success})
    } else {
      this.setState({apiStatus2: apiConstant.failure})
    }
  }

  loaderFunction = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onClickFullTime = value => {
    const {employeType} = this.state
    const isThere = employeType.includes(value)
    console.log(isThere)
    if (isThere === true) {
      const filterArray = employeType.filter(each => each !== value)
      this.setState(() => ({employeType: filterArray}), this.getJobsList)
    } else {
      this.setState(prev => ({employeType: [...prev.employeType, value]}))
    }
  }

  profileCardFunction = () => {
    const {profileData} = this.state
    return (
      <div className="side1-card">
        <img
          src={profileData.profileImageUrl}
          className="jobs-avatar"
          alt="profile-avatar"
        />
        <h1>{profileData.name}</h1>
        <p>{profileData.shortBio}</p>
      </div>
    )
  }

  employmentType = () => (
    <>
      {employmentTypesList.map(i => (
        <EmploymentType
          list={i}
          onClickFullTime={this.onClickFullTime}
          key={i.employmentTypeId}
        />
      ))}
    </>
  )

  onChangeSalaryRange = event => {
    this.setState({salaryRange: event.target.value}, this.getJobsList)
  }

  salaryRange = () => (
    <>
      <form onChange={this.onChangeSalaryRange}>
        <input
          type="radio"
          id="contactChoice1"
          name="contact"
          value="1000000"
        />
        <label htmlFor="contactChoice1">10 LPA</label>
        <br />
        <input
          type="radio"
          id="contactChoice2"
          name="contact"
          value="2000000"
        />
        <label htmlFor="contactChoice2">20 LPA</label>
        <br />
        <input
          type="radio"
          id="contactChoice3"
          name="contact"
          value="3000000"
        />
        <label htmlFor="contactChoice3">30 LPA</label>
        <br />
        <input
          type="radio"
          id="contactChoice4"
          name="contact"
          value="4000000"
        />
        <label htmlFor="contactChoice4">40 LPA</label>
      </form>
    </>
  )

  apiChecking = () => {
    const {apiStatus1} = this.state
    switch (apiStatus1) {
      case 'PROGRESS':
        return this.loaderFunction()
      case 'SUCCESS':
        return this.profileCardFunction()
      case 'FAILURE':
        return this.loaderFunction()
      default:
        return null
    }
  }

  apiChecking2 = () => {
    const {apiStatus2} = this.state
    switch (apiStatus2) {
      case 'PROGRESS':
        return this.loaderFunction()
      case 'SUCCESS':
        return this.jobsListCards()
      case 'FAILURE':
        return this.loaderFunction()
      default:
        return null
    }
  }

  leftDiv = () => {
    const {profileData} = this.state
    return (
      <div className="jobs-div1">
        {this.apiChecking()}
        <hr />
        <h2>Type of Employment</h2>
        <div>{this.employmentType()}</div>
        <h2>Salary Range</h2>
        <div>{this.salaryRange()}</div>
      </div>
    )
  }

  jobsListCards = () => {
    const {jobsList} = this.state
    return (
      <ul className="ul-joblist-container">
        {jobsList.map(each => (
          <JobItemCard key={each.id} each={each} />
        ))}
      </ul>
    )
  }

  rightDiv = () => {
    const {jobsList} = this.state
    return (
      <div className="jobs-div2">
        <div className="job-search-container">
          <input type="search" className="job-search-input" />
          <button type="button" className="job-search-button">
            <FaSearch />
          </button>
        </div>
        {this.apiChecking2()}
      </div>
    )
  }

  render() {
    const {employeType} = this.state
    return (
      <div className="jobs-home">
        <div className="jobs-body">
          <Header />
          <div className="jobs-cards-container">
            {this.leftDiv()}
            {this.rightDiv()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
