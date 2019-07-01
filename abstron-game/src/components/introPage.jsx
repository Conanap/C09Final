import React, { Component } from "react";
import SignInComponent from "./signInComponent";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";


const client = new ApolloClient({
  uri: "https://abstron.net:2053/graphql"

});


class introPage extends Component {

  render() {
    let gallery = (
      <ApolloProvider client={client}>
        <div className="flex-container">
          <div id="image-tab">
            <div id="tron-gif" />
          </div>
          <div id="auth-tab">
            <SignInComponent />
          </div>
        </div>
      </ApolloProvider>
    );

    return gallery;
  }
}

export default introPage;
