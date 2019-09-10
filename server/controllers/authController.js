const users = require("../models/users");
let id = 1;

module.exports = {
  register: (req, res) => {
    const { session } = req;
    // look for a username and password on the req.body
    const { username, password } = req.body;
    // create a user object and push to the users array
    users.push({
      id,
      username,
      password
    });
    // increment the value of id by one so we can keep the value of id unique
    id++;
    // set the value of username on req.session user obj to the value of username
    session.user.username = username;
    // method should return the updated user obj with status of 200
    res.status(200).json(session.user);
  },
  login: (req, res) => {
    const { session } = req;
    const { username, password } = req.body;

    const user = users.find(
      user => user.username === username && user.password === password
    );
    if (user) {
      session.user.username = user.username;
      res.status(200).json(session.user);
    } else {
      res.status(500).json("Unauthorized");
    }
  },
  signout: (req, res) => {
    req.session.destroy();
    res.status(200).json(req.session);
  },
  getUser: (req, res) => {
    const { session } = req;
    res.status(200).send(session.user);
  }
};
