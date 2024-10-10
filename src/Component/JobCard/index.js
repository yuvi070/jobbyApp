import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaStar} from 'react-icons/fa'
import {ImLocation} from 'react-icons/im'
import {MdWork} from 'react-icons/md'

import Header from '../Header'
import SimilarJobCard from '../SimilarJobCard'
import './index.css'

const apiConstant = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobCard extends Component {
  state = {
    apiResult: {},
    apiStatus: apiConstant.initial,
    similarJobsData: [],
  }

  componentDidMount() {
    this.getSpecificJobCard()
  }

  getSpecificJobCard = async () => {
    this.setState({apiStatus: apiConstant.progress})
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
      const updatedData = {
        jobDetails: {
          companyLogoUrl: data.job_details.company_logo_url,
          companyWebsiteUrl: data.job_details.company_website_url,
          employmentType: data.job_details.employment_type,
          id: data.job_details.id,
          jobDescription: data.job_details.job_description,
          lifeAtCompany: data.job_details.life_at_company,
          location: data.job_details.location,
          packagePerAnnum: data.job_details.package_per_annum,
          rating: data.job_details.rating,
          skills: data.job_details.skills,
          title: data.job_details.title,
        },
        // similarJobs: {
        //   companyLogoUrl: data.similar_jobs.company_logo_url,
        //   employmentType: data.similar_jobs.employment_type,
        //   id: data.similar_jobs.id,
        //   jobDescription: data.similar_jobs.job_description,
        //   location: data.similar_jobs.location,
        //   rating: data.similar_jobs.rating,
        //   title: data.similar_jobs.title,
        // },
      }
      this.setState({
        apiResult: updatedData,
        similarJobsData: data.similar_jobs,
        apiStatus: apiConstant.success,
      })
    } else {
      this.setState({apiStatus: apiConstant.failure})
    }
  }

  renderSuccess = () => {
    const {apiResult, similarJobsData} = this.state
    const each = apiResult
    console.log(each)
    console.log(similarJobsData)
    return (
      <div>
        <Header />
        <div className="job-item-card jobCard-main">
          <div className="job-item-div1">
            <img
              src={each.jobDetails.companyLogoUrl}
              alt=""
              className="job-item-logo"
            />
            <div className="job-item-div2">
              <h4>{each.jobDetails.title}</h4>
              <div className="job-item-div3">
                <FaStar className="star-icon" />
                <p className="job-item-rating-text">{each.jobDetails.rating}</p>
              </div>
            </div>
          </div>
          <div className="job-item-div4">
            <div>
              <div className="job-item-div3">
                <div className="job-item-div3-mini">
                  <ImLocation />
                  <p className="job-item-div3-para">
                    {each.jobDetails.location}
                  </p>
                </div>
                <div className="job-item-div3-mini">
                  <MdWork />
                  <p className="job-item-div3-para">
                    {each.jobDetails.employmentType}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h3>{each.jobDetails.packagePerAnnum}</h3>
            </div>
          </div>

          <hr />
          <div className="">
            <div className="company-link-navigation-container">
              <h3>Description</h3>
              <a
                className="company-link-navigation"
                href={each.jobDetails.companyWebsiteUrl}
              >
                Visit
              </a>
            </div>

            <p>{each.jobDetails.jobDescription}</p>
          </div>
          <h3>Skills</h3>
          <ul className="skills-container">
            {each.jobDetails.skills.map(i => (
              <li className="skill-card-container">
                <img
                  src={i.image_url}
                  alt="skill-image"
                  className="skill-image"
                />
                <p>{i.name}</p>
              </li>
            ))}
          </ul>
          <h2>Life at Company</h2>
          <div className="life-at-company-container">
            <p>{each.jobDetails.lifeAtCompany.description}</p>
            <img
              src={each.jobDetails.lifeAtCompany.image_url}
              alt=""
              className=""
            />
          </div>
          <h2>Similar Jobs</h2>
          <div className="similar-jobs-container">
            {similarJobsData.map(i => (
              <SimilarJobCard each={i} key={i.id} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  renderProgress = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailure = () => (
    <div>
      <h1>This is failure view</h1>
    </div>
  )

  renderOutputs = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'PROGRESS':
        return this.renderProgress()
      case 'SUCCESS':
        return this.renderSuccess()
      case 'FAILURE':
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    const {apiStatus} = this.state
    return (
      <div className="jobCard-home">
        <div className="jobCard-body">{this.renderOutputs()}</div>
      </div>
    )
  }
}

export default JobCard
