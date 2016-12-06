const React = require('react');
const CommentList = require('./CommentList.jsx');
const CommentInput = require('./CommentInput.jsx');

const CommentArea = ({project, comments})=> {
	return (
	  <div>
	  	<CommentInput project={project} />
	    <CommentList comments={comments} />
	  </div>
	);

}


module.exports = CommentArea;