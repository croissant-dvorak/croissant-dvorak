const React = require('react');
const CommentArea = require('./CommentArea.jsx');

class Project extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentProject: props.project,
      comments: [],
    };

    this.imageSrc = 'public/noImage.png';
    if ( props.project.pictureData !== undefined) {
      this.imageSrc = 'data:' + props.project.mimetype + ';base64,' + new Buffer(props.project.pictureData.data).toString('base64');
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
  }

  componentDidMount() {

  }

  handleInputChange(event) {
    console.log('event', event);
    // this.setState({
    //   currentSearch: event.target.value,
    // });
  }

  handleSelection(event) {
    console.log('selected', event[0].name);
    // this.setState({
    //   currentSearch: event.target.value,
    // });
  }

  render() {
    return (
      <div className="card">
        <div className="row titlebar">
          <div className="col-md-2 thumbnail">
            <img src={this.imageSrc} height="100%" width="100%" />
          </div>
          <div className="col-md-4">
            <div>{this.props.project.name}</div>
            <div>{this.props.project.city}</div>
            <div>{this.props.project.owner}</div>
          </div>
          <div className="col-md-4">
            <div>{this.props.project.startDate}</div>
            <div>{this.props.project.compDate}</div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 project-small-map">
            <div className="googleMaps">
            </div>
          </div>
          <div className="col-md-4 project-description">
            <div>{this.props.project.description}</div>
          </div>
        </div>
        <div>
            <CommentArea comments={this.state.comments} project={this.props.project} />
        </div>
      </div>
    );
  }
}

module.exports = Project;
            // <input placeholder="Austin" type="text" value={this.state.currentSearch} onChange={this.handleChange} /><br />
