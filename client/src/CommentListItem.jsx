//CommentListItem.jsx


const CommentListItem = (props) => {
  return (
    <div className="card">
      <div className="row">
        <div className="col-sm-4 col-md-2 commentListItem-Image">
          <img src={props.comment.thumbnail}/>
        </div>
        <div className="col-sm-8 col-md-10 commentListItem-Body">
          <div>{props.comment.username}</div>
          <div>{props.comment.text_data}</div>
          <div>{props.comment.date}</div>
        </div>
      </div>
    </div>
  )
};


module.exports = CommentListItem;