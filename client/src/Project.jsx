const React = require('react');
const CommentList = require('./CommentList.jsx');
var Typeahead = require('react-bootstrap-4-typeahead').default;
var data = require('../data.js');
// import Typeahead from 'react-bootstrap-typeahead';

class Project extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentProject: props.project,
      comments: [],
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
  }

  componentDidMount() {
    // this.getComments() {

    // }
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
            {/**<img src={this.props.project.thumbnail}/>*/}
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
            <CommentList comments={this.state.comments} />
        </div>
      </div>
    );
  }
}

module.exports = Project;
            // <input placeholder="Austin" type="text" value={this.state.currentSearch} onChange={this.handleChange} /><br />
