import React, { Component } from "react";
import { startPushService } from "../client/client_game";
import { connect, redirect } from "../client/client";

class game extends Component {
  componentDidMount() {
    startPushService();
    // Runs the client sided game located in scripts/core_game.js
    connect();
  }

  render() {
    let gameCanvas = (
      <React.Fragment>
        <div id="post_modal">
          <div className="popup">
            <p>Game Over!</p>
            <p id="game-stats" />
            <div className="centered">
              <button
                className="popup_btn"
                onClick={function() {
                  redirect("lobby");
                }}
              >
                Home
              </button>
              <button
                className="popup_btn"
                onClick={function() {
                  redirect("highscore");
                }}
              >
                Highscores
              </button>
            </div>
          </div>
        </div>
        <div id="game-content">
          <div className="info">
            <div className="your-info">
              Current Score: <span id="current-score">0</span>
              <br />
              Lives Remaining: <span id="current-lives">...</span>
            </div>
            <div className="enemy-info">
              Enemy Score: <span id="enemy-score">0</span>
              <br />
              Enemy Lives: <span id="enemy-lives">...</span>
            </div>
          </div>
          <br />
          <br />
          <canvas id="game-canvas" height="520" width="1400" />
        </div>
      </React.Fragment>
    );
    return gameCanvas;
  }
}

export default game;
