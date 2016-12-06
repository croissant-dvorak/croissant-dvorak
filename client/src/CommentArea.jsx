const React = require('react');
const CommentList = require('./CommentList.jsx');
const CommentInput = require('./CommentInput.jsx');

const CommentArea = props => (
  <div>
  	{<CommentInput project={project}>}
  </div> 
  <div>
    {<CommentList comments={comments}>}
  </div>
);



module.exports = CommentArea;