const React = require('react');
const CommentListItem = require('./CommentListItem.jsx');

const CommentList = (props) => {
  console.log('props', props);

  return(
    <div>
      {props.comments.map((comm, idx) => <CommentListItem project={comm} key={idx} />)}
    </div>
  )
};



module.exports = CommentList;