import { setScoreMutation } from "../queries/queries";

// use 'esversion: 6'
let server = null;
let player_id = null;

// Canvas items for drawing to the page
let canvas_context = null;
let canvas = null;
const grid_size = 10;
const GOAL_COLOR = "#44ff60";
const P1 = 0;
const P2 = 1;
let game_over_notif = false;
let score = 0;

export function redirect(location) {
  window.location.href = location;
}

export function submitMessage() {
  let contents = document.getElementById("messageBox");
  postMessage("User", contents.value);
  contents.value = "";
}

function postMessage(username, content) {
  let chatroom = document.getElementById("lobby-content");
  let element = document.createElement("div");
  element.className = "user-message";
  element.innerHTML = `
      <span class="user-messagename">${username}</span>:
      <span class="user-messagecontent">${content}</span>
  `;
  chatroom.appendChild(element);
}

export function connect() {
  // connecting to our signaling server
  server = new WebSocket("wss://abstron.net:2083");

  server.onopen = function() {
    // Gets the WebGL drawing components
    canvas = document.getElementById("game-canvas");
    canvas_context = canvas.getContext("2d");
    // Adds a keylistener for tracking keyboard input
    document.addEventListener("keydown", keyListenerHandler);
    console.log("Connected to the signaling server");
  };

  // when we got a message from a signaling server - something has changed
  server.onmessage = function(msg) {
    if (player_id == null) {
      player_id = msg.data;
    } else {
      if (msg.data === "Game Over") {
        gameOver();
      } else {
        let data = JSON.parse(msg.data);
        // Sees if the game has started yet
        updateGame(data);
      }
    }
  };
}

function gameOver() {
  // Display sthe end screen
  if (!game_over_notif) {
    game_over_notif = true;
    toggleEndModal();

      if(document.cookie.includes("username")){
        let username = (document.cookie.split("username=")[1]).split(";")[0];
        if(username.length !== 0){
          setScoreMutation(username,score);
        
        }

      }
      // alert("GAME OVER! Your highscore was:" + getScore());
  } else {
    return;
  }
}

function lifeGenerator(n) {
  if (n === 0) {
    return "Game Over!";
  }
  let x = "";
  for (let i = 0; i < n; i++) {
    x += "❤";
  }
  return x;
}

function updateGame(data) {
  let player_one = data.p1;
  let player_two = data.p2;
  let goal = data.apple;

  // Background of program
  canvas_context.fillStyle = "black";
  canvas_context.fillRect(0, 0, canvas.width, canvas.height);

  let player_num = parseInt(player_id);
  if (player_num === P1) {
    score = player_one.score;
    drawScores(player_one, player_two);
  } else if (player_num === P2) {
    score = player_two.score;
    drawScores(player_two, player_one);
  }

  drawPlayer(player_one);
  drawPlayer(player_two);

  // Draws the goal
  canvas_context.fillStyle = GOAL_COLOR;
  canvas_context.fillRect(
    goal.x * grid_size,
    goal.y * grid_size,
    grid_size - 2,
    grid_size - 2
  );
}

function drawScores(player_one, player_two) {
  let score = document.getElementById("current-score");
  let e_score = document.getElementById("enemy-score");
  score.innerHTML = player_one.score;
  e_score.innerHTML = player_two.score;

  let num_lives = player_one.lives;
  let e_num_lives = player_two.lives;
  let lives = document.getElementById("current-lives");
  let e_lives = document.getElementById("enemy-lives");
  let life_element = lifeGenerator(num_lives);
  let e_life_element = lifeGenerator(e_num_lives);
  lives.innerHTML = life_element;
  e_lives.innerHTML = e_life_element;
}

function drawPlayer(player) {
  let position_x = player.x;
  let position_y = player.y;
  let trail = player.trail;

  // Draws the trail of the snake
  canvas_context.fillStyle = player.color;
  for (var i = 0; i < trail.length; i++) {
    canvas_context.fillRect(
      trail[i].x * grid_size,
      trail[i].y * grid_size,
      grid_size - 2,
      grid_size - 2
    );
  }

  // Draws the current position of the snake
  canvas_context.fillStyle = "white";
  canvas_context.fillRect(
    position_x * grid_size,
    position_y * grid_size,
    grid_size - 2,
    grid_size - 2
  );
}

function keyListenerHandler(evt) {
  let data = { player: player_id, event: evt.key };
  server.send(JSON.stringify(data));
}

function toggleEndModal() {
  let info = document.getElementById("game-stats");
  info.innerHTML = "Your Score: " + score;
  let collapsable = document.getElementById("post_modal");
  if (collapsable.style.display === "block") {
    collapsable.style.display = "none";
  } else {
    collapsable.style.display = "block";
  }
}
