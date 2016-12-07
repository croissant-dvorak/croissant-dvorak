const React = require('react');

const ProjectListItem = (props) => {

  var src = 'public/noImage.png';
  if ( props.project.pictureData !== undefined) {
    src = 'data:' + props.project.mimetype + ';base64,' + new Buffer(props.project.pictureData.data).toString('base64');
  }

  return (
    <div className="card" onClick={() => props.viewProject(props.project) }>
      <div className="row">
        <div className="col-sm-4 col-md-2 projectListItem-Image">
        <img src={src} height="100%" width="100%" />
        </div>
        <div className="col-sm-8 col-md-10 projectListItem-Body">
          <h3 className="title">{props.project.name}</h3>
          <div className="location-img"></div>
          <div className="location ">{props.project.city}</div>
          <div className="proj-description ">{props.project.description}</div>
        </div>
      </div>
    </div>
  )
};

module.exports = ProjectListItem;

// <div className="card-title">{props.project.name}</div>
// <small>Description</small><br/>
// <span>
//   {props.project.description}
// </span>
