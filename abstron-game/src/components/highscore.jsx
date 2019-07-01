import React, { Component } from "react";
import { graphql } from "react-apollo";
import { highScoresQuery } from "../queries/queries";

class highscore extends Component {
  getTopScores() {

    let items = this.props.data;
    let hs_element = document.getElementById("highscores");

    // Inserts the top 10 players into the highscores table
    if(!items.loading){
      items.highScores.forEach(function(item) {
        let newRow = hs_element.insertRow(-1);
        let name = newRow.insertCell(0);
        let nameText = document.createTextNode(item.username);
        name.appendChild(nameText);
        let score = newRow.insertCell(-1);
        let scoreText = document.createTextNode(item.score);
        score.appendChild(scoreText);
      });
    }




  }

  render() {
    let hs_table = (
      <React.Fragment>
        <div class="container">
          <h1 class="title-text"> Hall of Fame </h1>
        </div>
        <div class="container">
          <table id="highscores">
            {this.getTopScores()}
            <tr>
              <th>Player</th>
              <th>Score</th>
            </tr>
          </table>
        </div>
      </React.Fragment>
    );
    return hs_table;
  }
}

export default graphql(highScoresQuery)(highscore);
