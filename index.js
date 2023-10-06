const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
// used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth-stratey');
const MongoStore = require("connect-mongo");
const sassMidleware = require("node-sass-middleware");
const flash = require('connect-flash');
const customMware = require('./config/middleware');
const favicon = require('serve-favicon')
const path = require('path');

app.use(
  sassMidleware({
    src: "./assets/scss",
    dest: "./assets/css",
    debug: true,
    outputStyle: "extended",
    prefix: "/css",
  })
);
const faviconPath = path.join(__dirname, 'assets', 'images', 'favicon.png');
app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static("./assets"));

//make the uploads path available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(express.static("./assets/images"));
app.use(favicon(faviconPath));
app.use(expressLayouts);

// extract style and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// set up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// Middleware
app.use(
  session({
    name: "Codeial",
    // todo change the secret before deployment in production mode.
    secret: "blahsomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: new MongoStore(
      {
        mongoUrl: "mongodb://127.0.0.1/codeial_development",
        collection: "session",
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "connect mongodb setup ok!!");
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);
// use express router
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server : ${err}`);
  }
  console.log(`Server is running on port : ${port}`);
});
