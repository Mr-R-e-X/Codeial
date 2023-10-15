class PostComments {
  constructor(postID) {
    this.postID = postID;
    this.postContainer = $(`#post-${postID}`);
    // console.log(this.postContainer)
    this.newCommentForm = $(`#post-${postID}-comments-form`);

    this.createComment(postID);

    let self = this;
    // call for existing comments'
    $('.delete-comment-button', this.postContainer).each(function(index, element){
      self.deleteComment($(element));
    })
  }

  createComment = function (postID) {
    let pSelf = this;
    this.newCommentForm.submit(function (e) {
      e.preventDefault();
      let self = this;
      console.log(self);
      $.ajax({
        type: "post",
        url: "/comments/create",
        data: $(self).serialize(),
        success: function (data) {
          let comment = data.data.comment;
          console.log(comment);
          let newComment = pSelf.newCommentDom(comment);
          $(`#post-comments-${postID}`).append(newComment);
          pSelf.deleteComment($(' .delete-comment-button', newComment));

        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  };

  // method to create a comment in DOM
  newCommentDom = function (comment) {
    return $(
      `<div id="comment-${comment._id}" class="comments">
      <img src="${comment.user.avatar}" alt="${comment.user.name}" style="height: 35px; width: 35px; border: 1px solid tomato; border-radius: 50%;"/>
      <p> &nbsp;${comment.user.name}</p>
        ${comment.content}
      <small>
        <a class="delete-comment-button" href="/comments/destroy/${comment._id}" >Delete Comment</a>
      </small>
    </div>`
    );
  };

  deleteComment(deleteLink){
    $(deleteLink).click(function(e){
      e.preventDefault();
      let Url = $(deleteLink).prop('href');
      console.log(Url)
      $.ajax({
        type: 'get',
        url: Url,
        success: function(data){
          console.log(data);
          $(`#comment-${data.data.comment_id}`).remove();

          new Noty({
            theme: 'relax',
            text: "Comment Deleted",
            type: 'success',
            layout: 'topRight',
            timeout: 1500
          }).show();
        }, error: function(error){
          console.log(error.responseText);
        }
      });
    });
  }
}
