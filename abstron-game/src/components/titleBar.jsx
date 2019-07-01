import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import { logoutMutation } from "../queries/queries";

class titleBar extends Component {

  floatyVisibility() {
    let username = localStorage.getItem("username");
    if (username === null) {
      return null;
    } else {
      return (
        <div class="floaty">
          Welcome, {username}!
          <br />
          <a className="navbar-link" href="/">
            Profile
          </a>
          <a className="navbar-link" href="/">
            Home
          </a>
          <a className="navbar-link" href="/highscore">
            Highscores
          </a>
          <a
            className="navbar-link"
            href=""
            onClick={this.logoutClicked.bind(this)}
          >
            Sign Out
          </a>
        </div>
      );
    }
  }

  logoutClicked(e) {
    e.preventDefault();
    let username = localStorage.getItem("username");
    console.log(username);
    this.props
      .logoutMutation({
        variables: {
          username: username
        }
      })
      .then(function(res) {
        console.log(res);
        window.location.href = "/";
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  render() {
    return (

      <React.Fragment>
        {this.floatyVisibility()}
        <a className="no-deco" href="/">
          <p id="cursive-title">Project-Abstron</p>
        </a>
        <p id="description-text">Outsmart. Outmaneuver. Survive.</p>
      </React.Fragment>
    );
  }
}

export default compose(graphql(logoutMutation, { name: "logoutMutation" }))(
  titleBar
);
