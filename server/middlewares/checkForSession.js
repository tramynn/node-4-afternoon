// add custom middleware that will check to see if a session has been created.
// If a session hasn't been made yet
// we'll create a user object that keeps track of a user's username, cart, and total.

// check if the session has a user object or not
// user obj will keep track of users on website
// store what items are in their cart, total cost, and their username
function checkForSession(req, res, next) {
  const { session } = req;
  // only add default user obj once -> add if statement to check if the user obj doesn't exist
  if (!session.user) {
    // if it doesn't exist, add a user a obj to session
    session.user = {
      username: "",
      cart: [],
      total: 0
    };
  }
  // call next after the if statement so that req can reach the endpoint
  next();
}

// export function
module.exports = checkForSession;
