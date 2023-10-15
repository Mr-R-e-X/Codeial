const Comment = require("../models/comment");
const Post = require("../models/post");
const commentsMailer = require('../mailers/comments_mailer');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');
const queueMicroTask = require('../workers/comment_email_worker');
module.exports.create = async function (req, res) {
  try {
    let post = await Post.findById(req.body.post);
    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });
      post.comments.push(comment);
      post.save();
      console.log(comment);
      comment = await comment.populate('user', 'name email avatar');
      // commentsMailer.newComment(comment);
      let job = queue.create('emails', comment).save((err)=>{
        if(err){
          console.log(`Error in sending to the queue => ${err}`);
          return;
        }
        console.log(`Job Enqueued => ${job.id}`);
      });

      if(req.xhr){
        return res.status(200).json({
          data: {
            comment: comment
          },
          message: "Comment Created"
        });
      }
      req.flash('success', 'Comment Published!!')
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
      await comment.deleteOne();
      await Post.updateOne({ _id: postId }, { $pull: { comments: req.params.id } });
      if (req.xhr){
        return res.status(200).json({
            data: {
                comment_id: req.params.id
            },
            message: "Post deleted"
        });
    }
      req.flash('success', 'Comment Deleted!');
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
