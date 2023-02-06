import {Component} from 'react'
import './index.css'

class AppointmentItem extends Component {
  render() {
    const {item, starClicked} = this.props
    const {id, title, date, stars} = item

    const updateStars = () => {
      starClicked(id)
    }

    const starClick = stars
      ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
    return (
      <li className="list-items">
        <div className="cards">
          <div className="card-flex">
            <p className="card-heading">{title}</p>
            <button
              type="button"
              data-testid="star"
              className="star-btn"
              onClick={updateStars}
            >
              <img src={starClick} alt="star" className="stars" />
            </button>
          </div>
          <p className="card-date">Date: {date}</p>
        </div>
      </li>
    )
  }
}

export default AppointmentItem
