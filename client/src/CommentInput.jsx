const React = require('react');


const CommentInput = (props) => {
  
  var formSubmit = function(e) {
    e.preventDefault();
    $.ajax({
      url: '/api/comments',
      type: 'POST',
      data: {
        userId: null,
        projectId: props.project._id,
        userName: null,
        textData: $('input[name=newComment]').val(),
        Date: null

      },
      success: function (commentPost) {
        console.log("New comment posted", commentPost);
        //What do we need to do on success?
        //Rerender the commentArea
      }

  })
    var data = {
        userId: null,
        projectId: props.project._id,
        userName: null,
        textData: $('input[name=newComment]').val(),
        Date: null

      };
      console.log("We posted this object", data);
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