{
    $(document).ready(() => {

        class PostComments  {
            constructor (postID) {
                this.postID = postID;
                this.postContainer = $(`#post-${postID}`);
                this.newCommentForm = $(`#post-${postID}-comments-form`);

                this.createComment(postID);

                // let self = this;

                // $(' .delete-comment-button', this.postContainer).each(() => {
                //     self.deleteComment($(this));
                // });
            }
        }

        let createComment = function(postID){
            let pSelf = this;
            console.log(`Create Comment inside ==> ${pSelf}`);
            this.newCommentForm.submit(function(e){ 
              e.preventDefault();
              let self = this;
              console.log(self);
              console.log('Add Comment clicked');
              $.ajax({
                type: "post",
                url: "/comments/create",
                data: $(data).serialize(),
                success:function(data){
                  let comment = data.data.comment;
                  console.log(comment);
                  let newComment = pSelf.newCommentDom(comment);
                  $(`#post-comments-${post._id}`).prepend(newComment);
                }, error: function(error){
                  console.log(error.responseText);
                }
              })
            })
        }
        
          // method to create a comment in DOM
          let newCommentDom = function(comment){
            return $(
                `<div id="comment-${comment._id}" class="comments">
            <p>
              <p style="display: inline; color: tomato;">
                <img src="${comment.user.avatar}" alt="${comment.user.name}">
                &nbsp;${comment.user.name};
              </p>
              ${comment.content}
                <small>
                  <a href="/comments/destroy/${comment._id}">Delete Comment</a>
                </small>
            </p>
          </div>`
          );
          }
        
          createComment();
    })
}