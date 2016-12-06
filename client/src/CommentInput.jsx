const React = require('react');


const CommentInput = props => {
  
  var formSubmit = function(e) {
    e.preventDefault();
    $.ajax({
      url: '/api/comments', //verify this endpoint
      type: 'POST',
      data: {project_id: project.id,
        username: $.('.usernameInput').val(),
        text_data: $.('.commentInput').val()

      }),
      success: function (commentPost) {
        console.log("New comment posted");
        //What do we need to do on success?
        //Rerender the commentArea?
      }

  }

  return (
    <form id='commentPostForm' onSubmit={formSubmit}>
      Username:
      <input class='usernameInput' type='text' name='userInput'>
      New Comment:
      <input class='commentInput' type='text' name='newComment'>
      <input type='submit' value='Add Comment'>
    </form>
  )
};



module.exports = CommentInput;