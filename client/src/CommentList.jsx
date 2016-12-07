const React = require('react');
const CommentListItem = require('./CommentListItem.jsx');

const CommentList = (props) => {
  console.log('props in commentList', props);

  return(
    <div>
      {props.comments.map((comm, idx) => <CommentListItem comment={comm} index={idx} />)}

    </div>
  )
};



module.exports = CommentList;