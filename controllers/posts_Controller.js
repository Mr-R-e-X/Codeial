const Post = require("../models/post");
const Comment = require("../models/comment");
const { post } = require("request");

module.exports.create = async function (req, res) {
  try {
    let post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });

    if(req.xhr){
      return res.status(200).json({
        data: {
          post: post
        },
        message: "Post Created!"
      });
    }

    req.flash('success', 'Post Published!')
    return res.redirect("back");
  } catch (err) {
    req.flash('error', err);
    console.log(`ERROR ===> Create Post ==> ${err}`);
    return;
  }
};

module.exports.destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);
    //.id means converting the object id into string
    if (req.user.id == post.user) {
      post.deleteOne();
      await Comment.deleteMany({ post: req.params.id });
      req.flash('success', 'Post and associated comments deleted!');
      return res.redirect("back");
    } else {
      req.flash('error', 'You can not delete this Post!');
      return res.redirect("back");
    }
  } catch (err) {
    if (err) {
      req.flash('error', err);
      console.log(`ERROR ===> ${err}`);
      return;
    }
  }
};
