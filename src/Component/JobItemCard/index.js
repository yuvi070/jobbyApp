import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {ImLocation} from 'react-icons/im'
import {MdWork} from 'react-icons/md'

import './index.css'

const JobItemCard = props => {
  const {each} = props
  const {id} = each
  return (
    <Link to={`/jobs/${id}`} className="card-link">
      <div className="job-item-card">
        <div className="job-item-div1">
          <img src={each.companyLogoUrl} alt="" className="job-item-logo" />
          <div className="job-item-div2">
            <h4>{each.title}</h4>
            <div className="job-item-div3">
              <FaStar className="star-icon" />
              <p className="job-item-rating-text">{each.rating}</p>
            </div>
          </div>
        </div>
        <div className="job-item-div4">
          <div>
            <div className="job-item-div3">
              <div className="job-item-div3-mini">
                <ImLocation />
                <p className="job-item-div3-para">{each.location}</p>
              </div>
              <div className="job-item-div3-mini">
                <MdWork />
                <p className="job-item-div3-para">{each.employmentType}</p>
              </div>
            </div>
          </div>
          <div>
            <h3>{each.packagePerAnnum}</h3>
          </div>
        </div>

        <hr />
        <div className="">
          <h3>Description</h3>
          <p>{each.jobDescription}</p>
        </div>
      </div>
    </Link>
  )
}

export default JobItemCard
