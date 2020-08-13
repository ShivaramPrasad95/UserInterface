import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import CheckCalendar from "./CheckCalendar";
import "./MockStyles.css";
import moment from "moment";

export default function ModalUsers(props) {
  let user = props.userDetails === undefined ? [] : props.userDetails;
  // console.log("user after", user.length===0);
  const [modalShow, setModalShow] = useState(false);
  // getting userName
  const [userName, setName] = useState();
  // getting activities
  const [userEvent, setEvents] = useState();
  // console.log(userEvent);

  useEffect(() => {
    if (user.length === 0) {
      console.log("empty", user.length);
      setName("User Guide");
    } else {
      setName(user.real_name);
      setEvents(user.activity_periods);
    }
  }, [user]);

  return (
    <div>
      <br />
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Launch User Activities
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        user={userName}
        events={userEvent}
      />
    </div>
  );
}

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.user}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.user === "User Guide" ? (
          <div>
            <h4>Catalogue for this user interface</h4>
            <p>Select a user to view their activities</p>
          </div>
        ) : (
          <div>
            <RecentActivity event={props.events} />
            {/* import Caledar Module */}
            <CheckCalendar event={props.events} />
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function RecentActivity(props) {
  // push the final activity end_time
  let eventLength = props.event.length - 1;
  let lastEndTime = props.event[eventLength].end_time;
  let removeTime = lastEndTime.split(" ").slice(-1);
  let finalEndTime = lastEndTime.replace(removeTime, " ");
  // console.log(lastEndTime.replace(removeTime, " "));

  // finding the day difference from last activity that they did
  let todayActivity = moment(finalEndTime).fromNow();
  console.log(todayActivity);

  return (
    <div>
      <h5>Recent Activities</h5>
      <h6 className="months__display">
        Last active <span class="badge badge-secondary">{todayActivity}</span>
      </h6>
      <ul>
        {props.event.map((ele) => (
          <li>
            {ele.start_time} - {ele.end_time}
          </li>
        ))}
      </ul>
    </div>
  );
}
