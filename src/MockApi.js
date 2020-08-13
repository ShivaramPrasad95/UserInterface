import React, { Component } from "react";
import axios from "axios";
import "./MockStyles.css";
import ModalUsers from "./ModalUsers";
// import users from "./UsersData";

const api = axios.create({
  // we can also define headers here if it has a token key
  //mock API application server got down
  // baseURL: `https://5f312476373bc7001635f572.mockapi.io/api/v1/members`
  // mocky api url=`https://designer.mocky.io/design/confirmation`
  baseURL: `https://run.mocky.io/v3/c9adad99-7a8e-420b-a69d-6a1bdd064970`
});

export default class CheckCalendar extends Component {
  constructor() {
    super();
    this.state = {
      usersData: [],
      display: "none",
      userDetails: []
    };
    this.check = this.check.bind(this);
  }

  componentDidMount() {
    this.getMockApi();
    // console.log("ccurrent State", this.state.usersData);
  }

  getMockApi = async () => {
    try {
      let usersData = await api.get("/").then(({ data }) => data);
      this.setState({
        usersData
      });
      console.log(this.state.usersData);
    } catch (error) {
      console.log(error);
    }
  };

  check(ev) {
    let user = ev.target.value;
    console.log("debugging", user);
    // find the value by its object key
    let userDetails = Object.values(this.state.usersData).find((k) => {
      return k.id === user;
    });

    this.setState({ modalShow: true, userDetails });
  }

  render() {
    return (
      <div className="mock__container">
        <h1>FullThrottle Labs</h1>
        <div class="form-group">
          <select className="form-control" id="sel1" onChange={this.check}>
            <option></option>
            {this.state.usersData.map((user) => (
              <option>{user.id}</option>
            ))}
            {/* <option>{this.state.usersData[0].id}</option>
            <option>{this.state.usersData[1].id}</option> */}
          </select>

          {/* modal */}
          <ModalUsers userDetails={this.state.userDetails} />
        </div>
      </div>
    );
  }
}
