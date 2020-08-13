import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./CalendarStyles.css";

export default class CheckCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      view: "week",
      toggleName: "Day View",
      event: this.props.event
    };
    this.togglebtn = this.togglebtn.bind(this);
    // console.log("event is getting", this.props.event);
  }

  componentDidMount() {
    this.setState({
      ...this.state
    });
  }

  togglebtn() {
    // alert("clicked");
    this.setState({
      view: this.state.view === "week" ? "day" : "week",
      toggleName:
        this.state.toggleName === "Day View" ? "Week View" : "Day View"
    });
  }

  render() {
    const localizer = momentLocalizer(moment);
    return (
      <div className="container">
        <div className="toggleBtn">
          <button className="btn btn-info" onClick={this.togglebtn}>
            {this.state.toggleName}
          </button>
        </div>
        <br />
        <Calendar
          // toolbar={false}
          localizer={localizer}
          events={events(this.state.event)}
          step={100}
          view={this.state.view}
          onView={() => {}}
          // views={["week"]}
          min={new Date(2020, 8, 1, 8, 0)} // 8.00 AM
          max={new Date(2020, 9, 1, 19, 0)} // Max will be 6.00 PM!
          date={this.state.date}
          onNavigate={(date) => this.setState({ date })}
        />
      </div>
    );
  }
}

function events(param) {
  // console.log("jdijodjicsdjo", param);
  // set title
  let title = "Activity";
  // set allDay
  let allDay = false;
  // start and end time wanna call dateFormat()
  let start = [];
  let end = [];

  if (param === undefined) {
    console.log("param exceeded");
  } else if (param.length !== 0) {
    param.forEach((ele) => {
      start.push(ele.start_time);
      end.push(ele.end_time);
    });
  }

  // executing the event for loop
  let eventObj = [];

  for (let i = 0; i < param.length; i++) {
    eventObj.push({
      title: title,
      allDay: allDay,
      start: new Date(dateFormat(start[i])),
      end: new Date(dateFormat(end[i]))
    });
  }

  // console.log("final out", eventObj);
  return eventObj;
}

function dateFormat(date) {
  // spliting the dates
  let finalDate = date; // "Aug 12 2020 3:45PM"

  // finding the time part & pass it to the convertor
  let time = finalDate.split(" ").slice(-1)[0]; // 3:45PM
  timeConvertor(time); // 15:45

  // return the result
  let timeFormat = timeConvertor(time);

  let change = finalDate.replace(time, timeFormat);
  // console.log("Inside date-format", change);
  return change;
}

// timeConversion from 12 to 24 hrs
function timeConvertor(time) {
  var PM = time.match("PM") ? true : false;

  time = time.split(":");
  let min = time[1];

  let hour;

  if (PM) {
    // to convert it from a string we need to use 10 as radix
    hour = 12 + parseInt(time[0], 10);
    // time[1].replace("PM", "");
    min = min.replace("PM", "");
  } else {
    hour = time[0];
    // time[1].replace("AM", "");
    min = min.replace("AM", "");
  }

  return hour + ":" + min;
  // console.log(hour + ":" + min);
}
