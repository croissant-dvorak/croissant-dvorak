const React = require('react');
const ProjectList = require('./ProjectList.jsx');
const FindNearbyProject = require('./FindNearbyProject.jsx');
const AddProject = require('./AddProject.jsx');
require('whatwg-fetch');

const Buttons = require('./Buttons.jsx');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
	  data: null,
      projectEntry: false,
      projects: [],
    };
  }

  componentDidMount () {
    this.fetchProjects();
    // this.getProjects();
  }

  getProjects() {
      console.log('we did it!!!');
        $.ajax({
            url: 'http://localhost:4040/projects',
            success: function(data) {
                this.setState({ data: data });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this),
        });
  }

  addProjectClick(){
    this.setState({
      projectEntry: true,
    });
  }

  closeAddProjectClick(){
    this.setState({
      projectEntry: false,
    });
  }

  fetchProjects(){
    fetch('http://localhost:4040/projects')
      .then(function(res) {
        // console.log('res', res);
        return res.json();
      })
      .catch(function(err) {
        console.error('err', err);
      })
      .then((function(json) {
        this.setState({ projects: json });
        console.log('setting state!');
      }).bind(this));
  }

  render() {
		var projectEntryComponent = this.state.projectEntry ? <AddProject closeAddProject={this.closeAddProjectClick.bind(this)} /> :  <ProjectList projects={this.state.projects} />

    return (
      <div>
        <div className="row title-bar">
          <div className="col-md-7 offset-md-1">
          </div>
        </div>
        <div className="row">
          <div className="col-md-7 offset-md-1">
            <Buttons addProject={this.addProjectClick.bind(this)} />
            { projectEntryComponent }  
          </div>
          <div className="col-md-4">
            <FindNearbyProject projects={this.state.projects} />
          </div>
        </div>
      </div>
    );
  }
}


module.exports = App;