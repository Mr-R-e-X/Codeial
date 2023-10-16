// const User = require('../../models/user');
{
  $(document).ready(() => {
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
            // console.log(post);
            let postId = post._id;
            console.log(postId);
            let newPost = newPostDom(post, user);
            $("#posts-list-container>p").prepend(newPost);
            new PostComments(postId);
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
      <h5 class="post-user-info">
        <img src="${user.avatar}" alt="${user.name}">
        &nbsp ${user.name}
      </h5>
      <h5 style="display: inline;">
        &emsp;&emsp; ${post.content}
        <h6 style="display: inline;">
          <small>
            <a class="delete-post-button" href="/posts/destroy/${post._id}">
              <i class="fa-solid fa-circle-minus fa-xl" style="color:red;"></i>
            </a>
          </small>
        </h6>
      </h5>
      <div class="post-comments">
        <form action="/comments/create" id="post-${post._id}-comments-form" method="POST">
          <input type="text" name="content" placeholder="type here to add comment ..." required />
          <input type="hidden" name="post" value="${post._id}" />
          <input type="submit" value="Add Comment" />
        </form>
      <div id="post-comments-list">
        <h5 style="position: relative;">
          <i class="fa-solid fa-comments" style="color: #512ad8;"></i> 
          Comments 
        </h5>
      </div>
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
            success: function (data) {
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
            error: function (error) {
              console.log(error.responseText);
            },
          });
        }
      );
    };

    let convertPostsToAjax = function () {
      let postElements = document.querySelectorAll(".post");
      postElements.forEach(function (postElement) {
        let fullpostId = postElement.getAttribute("id");
        postId = fullpostId.split("-")[1];
        new PostComments(postId);
      });
    };
    creatPost();
    deletePost();
    convertPostsToAjax();
  });
}