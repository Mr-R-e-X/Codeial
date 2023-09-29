const Post = require("../models/post");
const User = require("../models/user");
module.exports.home = async function (req, res) {
  try {
    let posts = await Post.find({})
    .sort('-createdAt')
      .populate("user")
      .populate({
        path: "comments",
        populate: { path: "user" },
      });
    let user = await User.find({});

    return res.render("home", {
      title: "< codeial />",
      posts: posts,
      all_users: user,
    });
  } catch (err) {
    console.log(`ERROR ===> Populating from DB ==> ${err}`);
    return;
  }
};
