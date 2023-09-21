{
    // method to submit the form data for new post using ajax.
    let creatPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost)
                }, error: function(error){
                    console.log(error.responseText);
                }
            })
        });
    }


    // method to creat a post in DOM.
    let newPostDom = function(post){
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
      `)
    }


    creatPost();
}