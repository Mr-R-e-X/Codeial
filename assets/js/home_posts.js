// const User = require('../../models/user');
{ 
  $(document).ready(()=>{
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
          let post = data.data.post;
          let user = data.data.user;
          let newPost = newPostDom(post,user);
          $("#posts-list-container>p").prepend(newPost);
          new Noty({
            theme: "relax",
            text: "Post Published!",
            type: "success",
            layout: "topRight",
            timeout: 1500,
          }).show();
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  };

  // method to creat a post in DOM.
  let newPostDom = function (post, user) {
    return $(`
    <div id="post-${post._id}" class="post">
    <div class="border">
      <h5 style="margin-top: 2px;">
        <img src="${user.avatar} " alt="${user.avatar}" height="40px" width="40px" style="border-radius: 50%;">
        &nbsp;${user.name}
        <i class="fa-solid fa-angles-right"></i>
      </h5>
      <h3 style="display: inline;">${post.content}
        <h6 style="display: inline;">
          <small>
            <i class="fa-solid fa-ellipsis-vertical"></i>
            <a class="delete-post-button" href="/posts/destroy/${post._id}">Delete</a>
          </small>
        </h6>
      </h3>
    <div class="post-comments">
      <form action="/comments/create" id="new-comment-form" method="POST">
        <input
          type="text"
          name="content"
          placeholder="type here to add comment ..."
          required
        />
        <input type="hidden" name="post" value="${post._id}" />
        <input type="submit" value="Add Comment" />
      </form>
    </div>
    </div>
  </div>
      `);
  };

  // method to delete a post from dom
  let deletePost = function () {
    // Attach a click event listener to a parent element that exists in the DOM
    $("#posts-list-container").on("click", ".delete-post-button", function (e) {
      e.preventDefault();
      console.log(this); // `this` refers to the clicked delete button
  
      const posturl = $(this).prop("href");
      $.ajax({
        type: "get",
        url: posturl,
        success: function(data) {
          const postId = data.data.post_id;
          $(`#post-${postId}`).remove();
          new Noty({
            theme: "relax",
            text: "Post and associated comments deleted!",
            type: "success",
            layout: "topRight",
            timeout: 1500,
          }).show();
        },
        error: function(error) {
          console.log(error.responseText);
        },
      });
    });
  };

  // method to create comment
  let createComment = function(){
    let newCommentForm = $("#new-comment-form");

    newCommentForm.submit(function(e){
      e.preventDefault();
      console.log('Add Comment clicked');
      $.ajax({
        type: "post",
        url: "/comments/create",
        data: newCommentForm.serialize(),
        success:function(data){
          let newComment = newCommentDom(data.data.comment);
          $("#post-comments-list>ul").prepend(newComment);
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
        </li>
     }`)
  }

  // let seeComment = $("#visible-comment");
  // let postCommet = $(".post-comments");
  // let commentList = $("#post-comments-list");
  // let commentsVisibility = function(){
  //   $(seeComment).on("click", function(e){
  //     e.preventDefault();
  //     postCommet.style.visibility = "visible";
  //     commentList.style.visibility = "visible";
  //   })
  // }
  // commentsVisibility();

  creatPost();
  deletePost();
  createComment();
})
}
