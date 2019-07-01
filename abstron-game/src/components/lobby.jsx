import React, { Component } from "react";
import { submitMessage, redirect } from "../client/client";

class lobby extends Component {
  componentDidMount() {
    // Keylistener to automatically process enter in the lobby chat
    document.addEventListener("keydown", function(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        submitMessage();
      }
    });
  }

  render() {
    let lobby = (
      <div className="flex-container">
        <div className="lobby-box">
          <div className="header-bar">Welcome to - Lobby 0xAEFFB12</div>
          <div className="container">
            <div id="lobby-sidebar">
              <div className="user-profile">
                <div className="pfp" />
                <div className="user-infobox">
                  <p className="user-name">TheLegend27</p>
                  Rank:{" "}
                  <span className="user-info" id="user-rank">
                    27
                  </span>{" "}
                  &nbsp;|&nbsp; Score:{" "}
                  <span className="user-info" id="user-score">
                    192,392
                  </span>
                  <br />
                  Status:{" "}
                  <span
                    role="img"
                    aria-label="ready"
                    className="user-info"
                    id="user-status"
                  >
                    ✅
                  </span>
                </div>
              </div>
              <div className="user-profile">
                <div className="pfp" />
                <div className="user-infobox">
                  <p className="user-name">Zezima</p>
                  Rank:{" "}
                  <span className="user-info" id="user-rank">
                    27
                  </span>{" "}
                  &nbsp;|&nbsp; Score:{" "}
                  <span className="user-info" id="user-score">
                    192,392
                  </span>
                  <br />
                  Status:{" "}
                  <span
                    aria-label="ready"
                    role="img"
                    className="user-info"
                    id="user-status"
                  >
                    ✅
                  </span>
                </div>
              </div>
              <div className="user-profile">
                <div className="pfp" />
                <div className="user-infobox">
                  <p className="user-name">Mob Psycho</p>
                  Rank:{" "}
                  <span className="user-info" id="user-rank">
                    27
                  </span>{" "}
                  &nbsp;|&nbsp; Score:{" "}
                  <span className="user-info" id="user-score">
                    192,392
                  </span>
                  <br />
                  Status:{" "}
                  <span
                    role="img"
                    aria-label="ready"
                    className="user-info"
                    id="user-status"
                  >
                    ✅
                  </span>
                </div>
              </div>
              <div className="user-profile">
                <div className="pfp" />
                <div className="user-infobox">
                  <p className="user-name">Leeroy Jenkins</p>
                  Rank:{" "}
                  <span className="user-info" id="user-rank">
                    27
                  </span>{" "}
                  &nbsp;|&nbsp; Score:{" "}
                  <span className="user-info" id="user-score">
                    192,392
                  </span>
                  <br />
                  Status:{" "}
                  <span
                    aria-label="ready"
                    role="img"
                    className="user-info"
                    id="user-status"
                  >
                    ✅
                  </span>
                </div>
              </div>
            </div>
            <div id="lobby-main">
              <div id="lobby-content">
                <div class="user-message">
                  <span className="user-messagename">Leeroy Jenkins</span>:
                  <span className="user-messagecontent">Times Up!</span>
                </div>
                <div class="user-message">
                  <span className="user-messagename">Leeroy Jenkins</span>:
                  <span className="user-messagecontent">Lets do this!</span>
                </div>
                <div class="user-message">
                  <span className="user-messagename">Leeroy Jenkins</span>:
                  <span className="user-messagecontent">LEEEEEROYYYYYY!</span>
                </div>
                <div class="user-message">
                  <span className="user-messagename">TheLegend27</span>:
                  <span className="user-messagecontent">
                    Oh my god he just ran in...
                  </span>
                </div>
              </div>
              <div className="lobby-bottombar">
                <textarea
                  class="lobby-textarea"
                  id="messageBox"
                  placeholder="Type a message here..."
                />
                <div class="lobby-infobox">
                  <div
                    type="submit"
                    class="lobby-submit"
                    onClick={function() {
                      submitMessage();
                    }}
                  >
                    Submit Message
                  </div>
                  <br />
                  <div
                    class="lobby-ready"
                    onClick={function() {
                      redirect("game");
                    }}
                  >
                    Ready to Play
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    return lobby;
  }
}

export default lobby;
