/**
 * source 1: https://graphql.org/graphql-js/running-an-express-graphql-server/
 * source 2: https://zellwk.com/blog/crud-express-mongodb/
 * source 3: https://medium.freecodecamp.org/a-beginners-guide-to-graphql-60e43b0a41f5
 * source 4: https://medium.freecodecamp.org/how-to-set-up-a-graphql-server-using-node-js-express-mongodb-52421b73f474
 */
const express = require("express");
const session = require("express-session");
const cookie = require("cookie");
const app = express();
const cors = require('cors');
const passport =require ('passport');
const FacebookStrategy = require ('passport-facebook').Strategy;
app.use(express.static("../abstron-game/public"));


const https = require('https');
const path = require('path');
const fs = require('fs');

// old code
let graphqlHTTP = require("express-graphql");
let schema = require("./graphql/");
// let bodyParser = require('body-parser');
const MongoClient = require("mongoose");

// mongoose internal bug requires this
MongoClient.set("useCreateIndex", true);
let db;


//Allow cross-origin requests
app.use(cors());

app.use(passport.initialize());
app.use(passport.session());



passport.use(new FacebookStrategy({
    clientID: "",
    clientSecret: "",
    callbackURL: "https://232773d2.ngrok.io/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    cb(null,profile);
  }));

passport.serializeUser(function(user, done) {
    done(null, JSON.stringify(user));
});

passport.deserializeUser(function(user, done) {
  done(null, JSON.parse(user));
});

app.get('/auth/facebook',
  passport.authenticate('facebook'));
 
app.get('/auth/facebook/callback',
  passport.authenticate('facebook'),
  function(req, res) {
        req.session.user = req.user.username;
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("username", req.user.username, {
            path: req.path
          }));

  });

app.use(
  session({
    secret: "",
    resave: false,
    saveUninitialized: true,
    maxAge: 60 * 60 * 24 * 7, // 1 week in number of seconds
    cookie: { httpOnly: false, sameSite: false, secure: false }
  })
);

app.use(function(req, res, next) {
  var username = req.session.user ? req.session.user : "";
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("username", username, {
      path: req.path
    })
  );
  console.log("HTTP request", username, req.method, req.url, req.body);
  next();
});

// running func
let serverRunFunc = function(client) {
  console.log("Mongoose initialization sucessful.");

  let port = 2052;
  let httpsPort = 2053;

  // run server
  // http
  app.listen(port);
  console.log("HTTP Server running on localhost:" + port + "/graphql");
  // https
  let httpsOpts = {
    key: fs.readFileSync(path.join("/home/ubuntu/project-abstron/abstron-game/src/server", "./abstron.net.key")),
    cert: fs.readFileSync(path.join("/home/ubuntu/project-abstron/abstron-game/src/server", "./abstron.net.pem"))
  };
  https.createServer(httpsOpts, app).listen(2053);
  console.log("HTTP Server running on localhost:" + httpsPort + "/graphql");
  
};

app.use(
  "/graphql",
  graphqlHTTP((req, res) => ({
    schema,
    graphiql: true,
    context: { req: req, res: res }
  }))
);
// connect to mongo db
MongoClient.connect(
  "mongodb+srv://admin:admin@cluster0-hzjkz.mongodb.net/test?retryWrites=true",
  { useNewUrlParser: true }
)
  .then(serverRunFunc)
  .catch(function(err) {
    console.log("Mongoose initialization failed.");
    console.log(err);
  });
