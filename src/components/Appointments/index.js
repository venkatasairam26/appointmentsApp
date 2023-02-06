import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem/index'
import './index.css'

class Appointments extends Component {
  state = {title: '', date: '', apData: [], isTrue: false}

  addForm = event => {
    event.preventDefault()
    const {title, date} = this.state
    const newDate = date ? format(new Date(date), 'dd MMMM yyyy, EEEE') : ''

    const newApData = {
      id: uuidv4(),
      title,
      date: newDate,
      stars: false,
    }
    this.setState(prevState => ({
      apData: [...prevState.apData, newApData],
      title: '',
      date: '',
    }))
  }

  starClicked = id => {
    this.setState(prevState => ({
      apData: prevState.apData.map(item => {
        if (id === item.id) {
          return {...item, stars: !item.stars}
        }
        return item
      }),
    }))
  }

  clickTrue = () => {
    this.setState(prevState => ({
      isTrue: !prevState.isTrue,
    }))
  }

  titleChange = event => {
    this.setState({title: event.target.value})
  }

  dateChange = event => {
    this.setState({date: event.target.value})
  }

  render() {
    const {title, date, isTrue, apData} = this.state

    const starredClick = () => {
      if (isTrue) {
        return apData.filter(item => item.stars === true)
      }
      return apData
    }

    return (
      <div className="bg-container">
        <div className="container">
          <h1 className="heading">Add Appointment</h1>
          <div className="form-container">
            <form className="form" onSubmit={this.addForm}>
              <label htmlFor="ap-title" className="label">
                Title
              </label>
              <input
                type="text"
                id="ap-title"
                value={title}
                onChange={this.titleChange}
                className="input"
                placeholder="Title"
              />
              <label htmlFor="ap-date" className="label">
                Date
              </label>
              <input
                type="date"
                value={date}
                id="ap-date"
                onChange={this.dateChange}
                placeholder="dd/MMMM/yy"
                className="input"
              />
              <div>
                <button type="submit" className="add-btn">
                  Add
                </button>
              </div>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              className="img"
              alt="appointments"
            />
          </div>
          <hr className="line" />
          <div className="task-container">
            <h1 className="task-heading">Appointments</h1>
            <button
              type="button"
              onClick={this.clickTrue}
              className={` btn ${isTrue ? 'task-blue' : 'task-outline'}`}
            >
              Starred
            </button>
          </div>
          <ul className="card-container">
            {starredClick().map(item => (
              <AppointmentItem
                key={item.id}
                item={item}
                starClicked={this.starClicked}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
