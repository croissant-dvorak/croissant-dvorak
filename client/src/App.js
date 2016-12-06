const React = require('react');
const ProjectList = require('./ProjectList.jsx');
const Project = require('./Project.jsx');
const FindNearbyProject = require('./FindNearbyProject.jsx');
const AddProject = require('./AddProject.jsx');
const Buttons = require('./Buttons.jsx');
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: [],
      currentView: 'projectList',
    };

    this.viewProject = this.viewProject.bind(this);
    this.closeAddProjectClick = this.closeAddProjectClick.bind(this);
  }

  componentDidMount() {
    this.getProjects();
  }

  getProjects(query = '') {
    $.ajax({
      url: 'http://localhost:4040/api/projects' + query,
      success: function(projects) {
          this.setState({ projects: projects });
      }.bind(this),
      error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
      }.bind(this),
    });
  }

  viewProject(project) {
    console.log(project);
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

  closeAddProjectClick() {
    console.log('closeAddProjectClick');
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
        return <AddProject closeAddProjectClick={this.closeAddProjectClick} />;
      }.bind(this),
      viewProject: function(state) {
        return <Project project={state.projects[0]} />;
      },
    };

    var projectEntryComponent = views[this.state.currentView](this.state);

    return (
      <div>
        <div className="row title-bar">
          <div className="col-md-7 offset-md-1">
            Title Bar
          </div>
        </div>
        <div className="row main">
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
