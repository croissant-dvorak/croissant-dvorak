const React = require('react');
const CommentList = require('./CommentList.jsx');
const CommentInput = require('./CommentInput.jsx');

const CommentArea = ({project, comments, getComments})=> {
	return (
	  <div>
	  	<CommentInput project={project} getComments={getComments} />
	    <CommentList comments={comments} />
	  </div>
	);

}


module.exports = CommentArea;