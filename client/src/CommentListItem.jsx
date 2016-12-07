const React = require('react');


const CommentListItem = (props) => {
  console.log('Date in item: ', props.comment.Date);
  return (
    <div className="card">
      <div className="row">
        <div className="col-sm-8 col-md-10 commentListItem-Body">
          <div>{props.comment.userName}</div>
          <div>{props.comment.textData}</div>
          <div>{props.comment.Date.toDateString()}</div>
        </div>
      </div>
    </div>
  )
};


module.exports = CommentListItem;