const swag = require("../models/swag");

module.exports = {
  add: (req, res) => {
    const { user } = req.session;
    const { id } = req.params;

    // this will return -1 if it isn't in the cart
    const index = user.cart.findIndex(swag => swag.id == id);
    if (index === -1) {
      const selectedSwag = swag.find(swag => swag.id == id);
      // if it isn't in the cart, add it to the cart and increase the total by the price of the swag
      user.cart.push(selectedSwag);
      user.total += selectedSwag.price;
    }
    // if it is, just return the req session's user object with a status of 200
    res.status(200).json(user);
  },
  delete: (req, res) => {
    const { id } = req.params;
    const { user } = req.session;
    // this will return -1 if it isn't in the cart
    // -1 means there isn't anything in the array
    const index = user.cart.findIndex(swag => swag.id == id);
    const selectedSwag = swag.findIndex(swag => swag.id == id);
    // if swag is in the cart, remove the swag from the cart and subtract the price from the total
    if (index !== -1) {
      user.cart.splice(index, 1);
      user.total -= selectedSwag.price;
    }
    // if swag is not in the cart, leave alone and return a status of 200 with the req session user's obj
    res.status(200).json(user);
  },
  checkout: (req, res) => {
    const { user } = req.session;
    // resetting the value cart to an empty array and a total to 0
    user.cart = [];
    user.total = 0;
    // return a status of 200 and the updated req session' user obj
    res.status(200).json(user);
  }
};
