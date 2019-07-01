import React from "react";
import { Switch, Route } from "react-router-dom";
import IntroPage from "./introPage";
import Game from "./game";
import Lobby from "./lobby";
import Highscore from "./highscore";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";



const client = new ApolloClient({
  uri: "https://abstron.net:2053/graphql"
});

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
  <main>
  	<ApolloProvider client={client}>
    <Switch>
      <Route exact path="/" component={IntroPage} />
      <Route path="/lobby" component={Lobby} />
      <Route path="/game" component={Game} />
      <Route path="/highscore" component={Highscore} />
    </Switch>
    </ApolloProvider>
  </main>
);

export default Main;
