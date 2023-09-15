const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = async function (req, res) {
  try {
    let post = await Post.findById(req.body.post);
    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });
      req.flash('success', 'Comment Published!!')
      post.comments.push(comment);
      post.save();
      return res.redirect("/");
    }
  } catch (err) {
    if (err) {
      req.flash('error', err);
      console.log(`ERROR ===> Comment ==> ${err}`);
      return;
    }
  }
};

module.exports.destroy = async function (req, res) {
  try {
    let comment = await Comment.findById(req.params.id);
    if (comment.user == req.user.id) {
      let postId = comment.post;
      req.flash('success', 'Comment Deleted!');
      comment.deleteOne();
      let post = Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});
      return res.redirect("back");
    }else{
      req.flash('error', 'You are not authorized to do that!');
      return res.redirect("back");
    }
  } catch (err) {
    if (err) {
      req.flash('error', err);
      console.log(`ERROR ===> Delete Comment ==> ${err}`);
      return;
    }
  }
};
