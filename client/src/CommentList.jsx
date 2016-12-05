//CommentList.jsx

const React = require('react');
const CommentListItem = require('./CommentListItem.jsx');

const CommentList = props => (
  <div>
    {props.comments.map((comm, idx) => <CommentsListItem project={comm} key={idx} />)}
  </div>
);



module.exports = CommentList;