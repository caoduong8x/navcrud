// index.component.js

import React, { Component } from "react";
import axios from "axios";
import TableRow from "./TableRow";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = { persons: [], refresh: false };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/persons")
      .then((response) => {
        console.log(response.data);
        this.setState({ persons: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  componentDidUpdate() {
    if (this.state.refresh) {
      axios
        .get("http://localhost:4000/persons")
        .then((response) => {
          console.log(response.data);
          this.setState({ persons: response.data });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  render() {
    return (
      <div>
        <h3 align="center">Persons List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Company</th>
              <th>Age</th>
              <th colSpan="2">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.persons.map((object, i) => {
              return (
                <TableRow
                  obj={object}
                  key={i}
                  setRefresh={() => {
                    this.setState({ refresh: true });
                  }}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
