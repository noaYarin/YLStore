require("dotenv").config();
const User = require("../models/userModel"),
  bcrypt = require("bcrypt"),
  _ = require("lodash"),
  { generateToken } = require("../services/auth");

const signUp = (userInfo) => {
  return new Promise((resolve, reject) => {
    let user = new User(userInfo);
    let { error } = user.validateUserFields(user._doc);
    if (!error) {
      user.password = user.hashUserPassword(user.password);
      return user
        .save()
        .then((userInfo) => resolve(userInfo))
        .catch((err) => {
          err = err.keyPattern
            ? "Email already exists"
            : "DB error. Try again later";
          reject(err);
        });
    }
    let err = error.details[0].message;
    reject(err);
  });
};

const signIn = (user) => {
  return new Promise((resolve, reject) => {
    User.findOne({ email: user.email })
      .then((recordedUser) => {
        bcrypt.compare(user.password, recordedUser.password, (err, results) => {
          if (err) reject(err);
          if (!results) reject("Wrong password");
          else {
            resolve({
              user: recordedUser,
              token: generateToken(recordedUser),
            });
          }
        });
      })
      .catch(() => reject("Invalid email or password"));
  });
};

module.exports = {
  signUp,
  signIn,
};
