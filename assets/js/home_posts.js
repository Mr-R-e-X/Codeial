{
  // method to submit the form data for new post using ajax.
  let creatPost = function () {
    let newPostForm = $("#new-post-form");

    newPostForm.submit(function (e) {
      e.preventDefault();

      $.ajax({
        type: "post",
        url: "/posts/create",
        data: newPostForm.serialize(),
        success: function (data) {
          let newPost = newPostDom(data.data.post);
          $("#posts-list-container>ul").prepend(newPost);
          new Noty({
            theme: "relax",
            text: "Post Published!",
            type: "success",
            layout: "topRight",
            timeout: 1500,
          }).show();
          deletePost($(" .delete-post-button", newPost));
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  };

  // method to creat a post in DOM.
  let newPostDom = function (post) {
    return $(`<li id="post-${post._id}">
        <div>
          <small>
            <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
          </small>
          <h3>${post.content}</h3>
          <p>${post.user.name}</p>
        </div>
        <div class="post-comments">
          <form action="/comments/create" method="POST">
            <input
              type="text"
              name="content"
              placeholder="type here to add comment ..."
              required
            />
            <input type="hidden" name="post" value="${post._id}" />
            <input type="submit" value="Add Comment" />
          </form>
          <div class="post-comments-list">
            <ul id="post-comments-${post._id}">
            </ul>
          </div>
        </div>
      </li>
      `);
  };

  // method to delete a post from dom
  let deletePost = function (deleteLink) {
    $(
      deleteLink.click(function (e) {
        e.preventDefault();

        $.ajax({
          type: "get",
          url: $(deleteLink).prop("href"),
          success: function (data) {
            $(`#post-${data.data.post_id}`).remove();
            new Noty({
              theme: "relax",
              text: "Post and associated comments deleted!",
              type: "success",
              layout: "topRight",
              timeout: 1500,
            }).show();
          },
          error: function (error) {
            console.log(error.responseText);
          },
        });
      })
    );
  };

  // method to create comment
  let createComment = function(){
    let newCommentForm = $('#new-comment-form');

    newCommentForm.submit(function(e){
      e.preventDefault();
      $.ajax({
        type: "post",
        url: "/comments/create",
        data: newCommentForm.serialize(),
        success:function(data){
          let newComment = newCommentDom(data.data.comment);
          $('.post-comments-list>ul').prepend(newComment);
        }, error: function(error){
          console.log(error.responseText);
        }
      })
    })
  }

  // method to create a comment in DOM
  let newCommentDom = function(comment){
    return $(`<li id="comment-${comment._id}">
    <p>
      <small>
        <a href="/comments/destroy/${comment._id}">X</a>
      </small>
      ${comment.content}
      <br />
      <small> &nbsp; ${comment.user.name} </small>
    </p>
  </li>`)
  }

  creatPost();
  createComment();
}
