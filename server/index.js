require("dotenv").config();
const express = require("express");
const session = require("express-session");
const checkForSession = require("./middlewares/checkForSession");
const authController = require("./controllers/authController");
const swagController = require("./controllers/swagController");
const cartController = require("./controllers/cartController");
const searhController = require("./controllers/searchController");

const app = express();

let { SERVER_PORT, SESSION_SECRET } = process.env;

// read JSON from the req.body and add session so we can create sessions
app.use(express.json());
// session needs a config obj as first arg w/ secret, resave, saveUninitialized
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);
// invoke checkForSession middleware
app.use(checkForSession);

// ENDPOINTS
// auth
app.post("/api/login", authController.login);
app.post("/api/register", authController.register);
app.post("/api/signout", authController.signout);
app.get("/api/user", authController.getUser);
// swag
app.get("/api/swag", swagController.read);
// cart
app.post("/api/cart/checkout", cartController.checkout);
app.post("/api/cart/:id", cartController.add);
app.delete("/api/cart/:id", cartController.delete);
// search
app.get("/api/search", searhController.search);

app.listen(SERVER_PORT, () => {
  console.log(`Server listening on PORT: ${SERVER_PORT}`);
});
