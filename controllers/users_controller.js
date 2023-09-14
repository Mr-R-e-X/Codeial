const User = require("../models/user");

// render the sign up page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }

  return res.render("user_sign_up", {
    title: "Codeial || Sign Up",
  });
};

// render the sign in page
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }

  return res.render("user_sign_in", {
    title: "Codeial || Sign In",
  });
};

module.exports.profile = async function (req, res) {
  try {
    let user = await User.findById(req.params.id);

    return res.render("user_profile", {
      title: "User Profile",
      profile_user: user,
    });
  } catch (err) {
    console.log(`ERROR ===> Profile ==> ${err}`);
    return res.redirect("back");
  }
};

// get the sign up data
module.exports.create = async function (req, res) {

  try {
    if (req.body.password != req.body.confirm_password) {
      return res.redirect("back");
    }
    let user = await User.findOne({ email: req.body.email });
    if(!user){
      await User.create(req.body);
      return res.redirect("/users/sign-in");
    }else {
      return res.redirect("back");
    }
  } catch (err) {
    if (err) {
      console.log(`ERROR ===> Sign Up ==> ${err}`);
      return;
    }
  }
};

// using passport for sign in and create a session
module.exports.createSession = function (req, res) {
  return res.redirect("/");
};

module.exports.destroySession = function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    return res.redirect("/");
  });
};
// Updating profile details.
module.exports.update = async function (req, res) {
  try {
    if (req.user.id == req.params.id) {
      await User.findByIdAndUpdate(req.params.id, req.body);
      return res.redirect("back");
    } else {
      return res.status(401).send(`401 ===> User ==> User Not Found`);
    }
  } catch (err) {
    console.log(`ERROR ===> Updating Profile ==> ${err}`);
    return;
  }
};