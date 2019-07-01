let User = require("../../models/User");
let Score = require("../../models/Score");
let Sub = require("../../models/Sub");

const validator = require("validator");
const crypto = require("crypto");
const cookie = require("cookie");

const webpush = require('web-push');
// for push notifications
const vapidKeys = {
  privateKey: 'nSRgyajDLg0jBF3__NEiRrf7O6uBTxdW53qgw8YQtwY',
  publicKey: 'BIoXMHmJO75p-tNRwP_6-j1pBMba44Aot8xxKxvjfexPkSk78We2shzc9sKsR-SaDjagNj3WKBcgZAv5v3zRCiQ'
};

webpush.setVapidDetails('mailto:albionapc+abstron@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

const sendNotification = function(sub, data="") {
  webpush.sendNotification(sub, data);
};

//Functions to validate the input
const checkString = function(s) {
  return validator.isAlphanumeric(s);
};

const checkScore = function(score) {
  return validator.isDecimal(score);
};

//Functions to hash the password
function generateSalt() {
  return crypto.randomBytes(16).toString("base64");
}

function generateHash(password, salt) {
  var hash = crypto.createHmac("sha512", salt);
  hash.update(password);
  return hash.digest("base64");
}

const users = function() {
  return new Promise(function(resolve, reject) {
    User.find({})
      .populate()
      .exec(function(err, res) {
        err ? reject(err) : resolve(res);
      });
  });
};

const user = function(root, args) {
  return new Promise(function(resolve, reject) {
    User.findOne(args).exec(function(err, res) {
      err ? reject(err) : resolve(res);
    });
  });
};

const createUser = function(
  root,
  { username, password, firstName, lastName },
  context
) {
  return new Promise(function(resolve, reject) {

    //Making sure the fields entered are alphanumeric
    if (
      !checkString(username) ||
      !checkString(password) ||
      !checkString(firstName) ||
      !checkString(lastName)
    ) {
        reject("A field enterned is not alphanumeric.");
    
    }

    user(root, { username: username }).then(function(err) {
        Promise.all(reject("Username already exists."));
    });

    let salt = generateSalt();
    let hashed = generateHash(password, salt);
    const newUser = new User({ username, hashed, salt, firstName, lastName });

    newUser.save(function(err, res) {
      err ? reject(err) : resolve(res);
    });
      
  });
};

const isAuthenticated = function(context) {
  return context.req.session.user;
};

const setUserHighScore = function(root, { username, score }, context) {
  const newScore = new Score({ username, score });

  //Probably not necessary here, but doing it anyway
  if (!checkString(username)) {
    return new Promise(function(resolve, reject) {
      reject("Username is not alphanumeric.");
    });
  }
  /*
    if(!checkScore(score)) {
        return reject("Score is not a number.");
        
    }*/
  if (!isAuthenticated(context)) {
    return new Promise(function(resolve, reject) {
      reject("User not authorized to complete this action.");
    });
  }
  return new Promise(function(resolve, reject) {
    newScore.save(function(err, res) {
      err ? reject(err) : resolve(res);
      !err ? notifySubs() : true;
    });
  });
};

const getHighScores = function(root, { num }, context) {
  const numScore = num || 10;

  return new Promise(function(resolve, reject) {
    Score.find({})
      .populate()
      .sort({ score: -1 })
      .limit(numScore)
      .exec(function(err, res) {
        err ? reject(err) : resolve(res);
      });
  });
};

const login = function(root, { username, password }, context) {
  return new Promise(function(resolve, reject) {
    //Making sure the fields entered are alphanumeric
    if (!checkString(username) || !checkString(password)) {
      return reject("A field entered is not alphanumeric.");
    }

    //Not sure if it's necessary
    if (isAuthenticated(context)) {
      return reject("User already logged in. Log out first.");
    }

    user(root, { username: username })
      .catch(function(err) {
        return reject("Username does not exist.");
      })
      .then(function(res) {
        if (res.hashed !== generateHash(password, res.salt)) {
          return reject("Password incorrect.");
        }
        context.req.session.user = username;
        context.res.setHeader(
          "Set-Cookie",
          cookie.serialize("username", username, {
            path: "/",
            maxAge: 0
          })
        );
        return resolve({ username });
      });
  });
};
//REFACTOR
const fbLogin = function(root,{ username, password, firstName, lastName },context){
  return new Promise(function(resolve,reject){
    createUser(root,{ username, password, firstName, lastName },context)
    .then(function(res){
      login(root, { username, password }, context)
      .then(function(res){
        return resolve({username});
      })
      .catch(function(err){
        return reject(err);
      });
    })
    .catch(function(err){
      console.log(err);
      if(err.includes("Username already exists.")){
          login(root, { username, password }, context)
          .then(function(res){
            return resolve({username});
          })
          .catch(function(err){
            return reject(err);
          });
      }
    });
  });



}

const logout = function(root, { username }, context) {
  return new Promise(function(resolve, reject) {
    //Making sure username entered is alphanumeric
    if (!checkString(username)) {
      return reject("Username is not alphanumeric.");
    }

    //Making sure the user is already logged in
    if (!isAuthenticated(context)) {
      return reject("User is not logged in. Log in first.");
    }

    user(root, { username: username })
      .catch(function(err) {
        return reject("Username does not exist.");
      })
      .then(function(res) {
        context.req.session.destroy();
        context.res.setHeader(
          "Set-Cookie",
          cookie.serialize("username", "", {
            path: context.req.path
          })
        );

        return resolve({ username });
      });
  });
};

const restrictPW = function(_, _) {
  return "Redacted";
};

const saveSub = function(root, { username, subscription, delta, dropTo }, context) {
  return new Promise(function(resolve, reject) {
    Sub.findOne({ username }).exec(function(err, res) {
      if(err)
        return reject(err);

        if(res) {
          console.log(res, "already exists");
          return reject("Subscriber already exists.");
        }

        const newSub = new Sub({ username, subscription, delta, dropTo });
        newSub.save(function(err, res) {
          console.log(err, res);
          err ? reject(err) : resolve(res);
        });
    });
  });
};

const notifySubs = function() {
  Score.find({})
        .populate()
        .sort({score: -1})
        .limit(10)
        .exec(function(err, scores) {
          if(err) {
            console.log(err);
            return err;
          }
          Sub.find({})
              .populate()
              .exec(function(err, list) {
                if(err) {
                  console.log(err);
                  return;
                }
                for(index in list) {
                  let obj = list[index];
                  
                  let sub = JSON.parse(obj.subscription);
                  if(sub.position > 9)
                    continue;

                  for(let i = 0; i < scores.length; i++) {
                    if(obj.username == score.username) {
                      if(obj.position < i) {
                        // obj.position = i;
                        Sub.update({ username: obj.username }, {$set: {"position": i}})
                        .exec(function(err, res) {
                          if(err) {
                            console.log(err);
                          }
                          sendNotification(sub, "You have ranked down on the top 10!");
                        });
                      } else if(obj.position != i) {
                        // went up
                        // re-add to database
                        // obj.position = i;
                        Sub.update({ username: obj.username }, {$set: {"position": i}});
                      }
                    }
                  }

                  // send dethrown noti if not found
                  Sub.update({ username: obj.username }, {$set: {"position": 11}})
                  .exec(function(err, res) {
                    if(err) {
                      console.log(err);
                      return err;
                    }
                    sendNotification(sub, "You have been kicked off from top 10!");
                  });
                }
              });
        });
};

const tn = function(root, {}, context) {
  return new Promise(function(resolve, reject) {
    Sub.find({}).populate()
    .exec(function(err, res) {
      if(err)
        return reject(err);
      let ret = [];
      for(i in res) {
        let obj = res[i].subscription;
        obj = JSON.parse(obj);

        sendNotification(obj, "test notification");
        console.log('sent ', i);
        ret.push(i);
      }

      resolve(ret);
    });
  });
};

const clearSub = function(root, {}, context) {
  return new Promise(function(resolve, reject) {
    Sub.deleteMany({}).exec(function(err, res) {
      if(err)
        return reject(err);
      return resolve();
    });
  });
  
};

const subs = function(root, {}, context) {
  return new Promise(function(resolve, reject) {
    Sub.find({}).populate().exec(function(err, res) {
      if(err)
        return reject(err);
      return resolve(res);
    });
  });
};

const clearScores = function(root, {}, context) {
  Score.deleteMany();
};

const output = {
  User: {
    hashed: restrictPW,
    salt: restrictPW
  },

  Query: {
    user: user,
    users: users,
    highScores: getHighScores,
    testNotifications: tn,
    subs
  },

  Mutation: {
    createUser: createUser,
    setUserHighScore: setUserHighScore,
    login: login,
    logout: logout,
    fbLogin: fbLogin,
    saveSub,
    clearSub,
    clearScores
  }
};
module.exports = output;
