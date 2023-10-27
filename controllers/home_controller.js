const Post = require("../models/post");
const User = require("../models/user");
const Friendship = require("../models/friendship");
module.exports.home = async function (req, res) {
  try {
    let posts = await Post.find({})
      .sort("-createdAt")
      .populate("user")
      .populate({
        path: "comments",
        populate: { path: "user" },
        options: { sort: "createdAt" },
      });
    let friendship = await Friendship.find({})
      .populate("to_user")
      .populate("from_user")
      .populate("status");
    let user = await User.find({}).populate("friendships");

    return res.render("home", {
      title: "< />",
      posts: posts,
      all_users: user,
      friendList: friendship,
    });
  } catch (err) {
    console.log(`ERROR ===> Populating from DB ==> ${err}`);
    return;
  }
};
