import React, { Component } from "react";
import "../css/form.css";
import { graphql, compose } from "react-apollo";
import { signUpMutation, loginMutation,fbLoginMutation } from "../queries/queries";
import FacebookLogin from 'react-facebook-login';

//var CryptoJS = require("crypto-js");

const secret ="12rjh23v3ghDKSHG2nad";

//const encryptPassword = function(password){
//  return CryptoJS.AES.encrypt(password, secret)
//}


class signIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  signUpClicked(e) {
    e.preventDefault();
    this.props
      .signUpMutation({
        variables: {
          username: this.state.username,
          firstName: "Random",
          lastName: "Random",
          password: this.state.password
        }
      })
      .then(function(res) {
        console.log(res);
      })
      .catch(function(err) {
        if (err.toString().includes("E11000")) {
          let errorBox = document.getElementById("error-box");
          errorBox.innerHTML = "Error - Username already taken.";
        }
      });
  }

  loginClicked(e) {
    e.preventDefault();
    this.props
      .loginMutation({
        variables: {
          username: this.state.username,
          password: this.state.password
        }
      })
      .then(function(res) {
        // Sets the username
        let usname = document.getElementById("usname").value;
        localStorage.setItem("username", usname);
        window.location.href = "game";
      })
      .catch(function(err) {
        if (err.toString().includes("Password incorrect")) {
          let errorBox = document.getElementById("error-box");
          errorBox.innerHTML = "Error - Incorrect username or password";
        }
      });
  }

  responseFacebook = (response) => {
        console.log(response);
       /* this.props
          .fbLoginMutation({
            variables: {
              username: response.name,
              firstName: "Random",
              lastName: "Random",
              password: encryptPassword(response.id)
            }
          })
          .then(function(res) {
            // Sets the username
            let usname = document.getElementById("usname").value;
            localStorage.setItem("username", usname);
            window.location.href = "game";

          })
          .catch(function(err) {
            console.log(err)
          });*/

    }



  render() {

    return (
      <div className="box">
        <p> Username </p>
        <input
          className="box-input"
          id="usname"
          type="text"
          name="username"
          onChange={e => this.setState({ username: e.target.value })}
        />
        <p> Password </p>
        <input
          className="box-input"
          type="password"
          name="password"
          onChange={e => this.setState({ password: e.target.value })}
        />
        <div className="flex-container">
          <input
            type="submit"
            value="Login"
            onClick={this.loginClicked.bind(this)}
          />
          <input
            type="submit"
            value="Sign Up"
            onClick={this.signUpClicked.bind(this)}
          />
        </div>
        <br />
        <span id="error-box" />
        <hr />
        <br />
        <p id="description-text">Or, authenticate with -</p>
        <div className="flex-container">
          {/* TODO: Change this from a random link to redirect after Signup above */}

          <FacebookLogin
            appId=""
            fields="name,email,picture"
            callback={(response)=>this.responseFacebook(response)}
          />

        </div>
      </div>
    );
  }
}

export default compose(
  graphql(signUpMutation, { name: "signUpMutation" }),
  graphql(loginMutation, { name: "loginMutation" }),
  graphql(fbLoginMutation,{name: "fbLoginMutation"})
)(signIn);
