import {FaStar} from 'react-icons/fa'
import {ImLocation} from 'react-icons/im'
import {MdWork} from 'react-icons/md'

const SimilarJobCard = props => {
  const {each} = props
  return (
    <div className="similar-jobs-card">
      <div className="job-item-div1">
        <img
          src={each.company_logo_url}
          alt=""
          className="job-item-logo similar-job-logo"
        />
        <div className="job-item-div2">
          <h4>{each.title}</h4>
          <div className="job-item-div3">
            <FaStar className="star-icon" />
            <p className="job-item-rating-text">{each.rating}</p>
          </div>
        </div>
      </div>
      <div>
        <h3>Description</h3>
        <p>{each.job_description}</p>
      </div>
      <div className="job-item-div3">
        <div className="job-item-div3-mini">
          <ImLocation />
          <p className="job-item-div3-para">{each.location}</p>
        </div>
        <div className="job-item-div3-mini">
          <MdWork />
          <p className="job-item-div3-para">{each.employment_type}</p>
        </div>
      </div>
    </div>
  )
}

export default SimilarJobCard
