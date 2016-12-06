const React = require('react');


const CommentInput = props => {
  
  var formSubmit = function(e) {
    e.preventDefault();
    $.ajax({
      url: '/api/comments', //verify this endpoint
      type: 'POST',
      data: {
        project_id: project.id,
        username: $('input[name=userInput]').val(),
        text_data: $('input[name=newComment]').val()

      },
      success: function (commentPost) {
        console.log("New comment posted", commentPost);
        //What do we need to do on success?
        //Rerender the commentArea?
      }

  })
}

  return (
    <form id='commentPostForm' onSubmit={formSubmit}>
      Username:
      <input type='text' name='userInput' />
      New Comment:
      <input type='text' name='newComment' />
      <input type='submit' value='Add Comment' />
    </form>
  )
};



module.exports = CommentInput;