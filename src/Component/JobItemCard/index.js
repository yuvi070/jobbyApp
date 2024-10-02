import {FaStar} from 'react-icons/fa'

import './index.css'

const JobItemCard = props => {
  const {each} = props
  return (
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
    </div>
  )
}

export default JobItemCard
