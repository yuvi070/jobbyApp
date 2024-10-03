import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaSearch} from 'react-icons/fa'
import JobItemCard from '../JobItemCard'
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

class Jobs extends Component {
  state = {
    jobsList: [],
    profileData: [],
    employeType: [],
  }

  componentDidMount() {
    this.getProfile()
    this.getJobsList()
  }

  getProfile = async () => {
    const token = Cookies.get('jwt_token')
    console.log(token)
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
      console.log(data)
      const updatedData = {
        name: data2.name,
        profileImageUrl: data2.profile_image_url,
        shortBio: data2.short_bio,
      }
      console.log(updatedData)
      this.setState({profileData: updatedData})
    } else {
      console.log('Error')
    }
  }

  getJobsList = async () => {
    const token = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/jobs'
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

      this.setState({jobsList: updatedData})
    }
  }

  onClickFullTime = () => {
    const {employeType} = this.state
    const value = 'FULLTIME'
    const isThere = employeType.includes(value)
    if (isThere === true) {
      const filterArray = employeType.filter(each => each !== value)
      this.setState(prev => ({employeType: [filterArray]}))
    } else {
      const updatedList = employeType.push(value)
      console.log(updatedList)
      this.setState(prev => ({employeType: [updatedList]}))
    }
  }

  employmentType = () => (
    <>
      <button
        type="button"
        onClick={this.onClickFullTime}
        className="checkbox-button"
      >
        <input
          type="checkbox"
          id="fullTime"
          name="Full Time"
          value="Full Time"
        />
        <label htmlFor="fullTime"> Full Time</label>
      </button>

      <br />
      <button
        type="button"
        onClick={this.onClickPartTime}
        className="checkbox-button"
      >
        <input
          type="checkbox"
          id="partTime"
          name="Full Time"
          value="Full Time"
        />
        <label htmlFor="partTime"> Part Time</label>
      </button>

      <br />
      <button
        type="button"
        onClick={this.onClickFreelance}
        className="checkbox-button"
      >
        <input
          type="checkbox"
          id="freelance"
          name="Full Time"
          value="Full Time"
        />
        <label htmlFor="freelance"> Freelance</label>
      </button>

      <br />
      <button
        type="button"
        onClick={this.onClickInternship}
        className="checkbox-button"
      >
        <input
          type="checkbox"
          id="internship"
          name="Full Time"
          value="Full Time"
        />
        <label htmlFor="internship"> Internship</label>
      </button>
    </>
  )

  salaryRange = () => (
    <>
      <form onChange={this.onChangeSalaryRange}>
        <input type="radio" id="contactChoice1" name="contact" value="10 lpa" />
        <label htmlFor="contactChoice1">10 LPA</label>
        <br />
        <input type="radio" id="contactChoice2" name="contact" value="20 lpa" />
        <label htmlFor="contactChoice2">20 LPA</label>
        <br />
        <input type="radio" id="contactChoice3" name="contact" value="30 lpa" />
        <label htmlFor="contactChoice3">30 LPA</label>
        <br />
        <input type="radio" id="contactChoice3" name="contact" value="40 lpa" />
        <label htmlFor="contactChoice3">40 LPA</label>
      </form>
    </>
  )

  leftDiv = () => {
    const {profileData} = this.state
    return (
      <div className="jobs-div1">
        <div className="side1-card">
          <img
            src={profileData.profileImageUrl}
            className="jobs-avatar"
            alt="profile-avatar"
          />
          <h1>{profileData.name}</h1>
          <p>{profileData.shortBio}</p>
        </div>
        <hr />
        <h2>Type of Employment</h2>
        <div>{this.employmentType()}</div>
        <h2>Salary Range</h2>
        <div>{this.salaryRange()}</div>
      </div>
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
        <ul className="ul-joblist-container">
          {jobsList.map(each => (
            <JobItemCard key={each.id} each={each} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {employeType} = this.state
    console.log(employeType)
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
