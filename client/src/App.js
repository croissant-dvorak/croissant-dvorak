const React = require('react');
const ProjectList = require('./ProjectList.jsx');
const Project = require('./Project.jsx');
const FindNearbyProject = require('./FindNearbyProject.jsx');
const AddProject = require('./AddProject.jsx');
const Buttons = require('./Buttons.jsx');

// window.apiBase = 'http://localhost:4040/api/'; // dev
window.apiBase = 'api/'; //prod

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: [],
      currentView: 'projectList',
    };

    this.viewProject = this.viewProject.bind(this);
    this.viewHome = this.viewHome.bind(this);
  }

  componentDidMount() {
    this.getProjects();
  }

  getProjects(query = '') {
    $.ajax({
      url: window.apiBase + 'projects' + query,
      success: function(projects) {
          this.setState({ projects: projects });
      }.bind(this),
      error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
      }.bind(this),
    });
  }

  viewProject(project) {
    console.log('switch to viewing project', project);
    this.setState({
      currentView: 'viewProject',
      projects: [project],
    });
  }

  addProjectClick() {
    this.setState({
      currentView: 'addProject',
    });
  }

  viewHome() {
    this.setState({
      currentView: 'projectList',
    });
  }

 

  render() {
    var views = {
      projectList : function(state) {
        return <ProjectList projects={state.projects} viewProject={this.viewProject} />;
      }.bind(this),
      addProject : function() {
        return <AddProject viewHome={this.viewHome} viewProject={this.viewProject} />;
      }.bind(this),
      viewProject: function(state) {
        return <Project project={state.projects[0]} />;
      },
    };

    var projectEntryComponent = views[this.state.currentView](this.state);

    return (
      <div>
        <div className="row main">
          <div className="col-md-7 offset-md-1">
            <Buttons addProject={this.addProjectClick.bind(this)} />
            { projectEntryComponent }
          </div>
          <div className="col-md-4">
            <FindNearbyProject projects={this.state.projects} viewProject={this.viewProject} />
          </div>
        </div>
      </div>
    );
  }
}


module.exports = App;
