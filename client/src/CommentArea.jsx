const React = require('react');
const CommentList = require('./CommentList.jsx');
const CommentInput = require('./CommentInput.jsx');

const CommentArea = props => (
  
  <form action='/SEND_TO_DB_ENDPOINT'>
    New Comment:
    <input type='text' name='newComment'>
    <input type='submit' value='Add Comment'>
  </form>
);



module.exports = CommentArea;