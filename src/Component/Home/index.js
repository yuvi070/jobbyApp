import Header from '../Header'
import './index.css'

const Home = () => (
  <div className="home-main-div">
    <div className="home-section">
      <Header />
      <div className="home-body">
        <h1>
          Find The Jobs That <br />
          Fits Your Life
        </h1>
        <p>
          Millions of people are searching for jobs, salary information, company
          reviews.
          <br /> Find the jobs that fits your abilities and potential.
        </p>
        <button type="button">Find Jobs</button>
      </div>
    </div>
  </div>
)

export default Home
