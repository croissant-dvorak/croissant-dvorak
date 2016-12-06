const React = require('react');
const Cookies = require('js-cookie')
const ProjectList = require('./ProjectList.jsx');
const Project = require('./Project.jsx');
const FindNearbyProject = require('./FindNearbyProject.jsx');
const AddProject = require('./AddProject.jsx');
const Buttons = require('./Buttons.jsx');
const LoginButton = require('./LoginButton.jsx');
const LogoutButton = require('./LogoutButton.jsx')
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: [],
      currentView: 'projectList',
      loginButtonShouldExist: true
    };

    this.viewProject = this.viewProject.bind(this);
    this.viewHome = this.viewHome.bind(this);
  }

  componentDidMount() {
    this.getProjects();
    this.readCookies();
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

  viewHome() {
    console.log('closeAddProjectClick');
    this.setState({
      currentView: 'projectList',
    });
  }


  readCookies() {
   var cookieName = Cookies.get('dvorak');
   if (cookieName){
    console.log("cookies", cookieName)
    this.setState({
      loginButtonShouldExist: false
    })
   } else {
    console.log("cookies", cookieName)

    Cookies.remove('name')
    this.setState({
      loginButtonShouldExist: true
      })
   }
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
    var LoginLogoutView = this.state.loginButtonShouldExist ? <LoginButton cookieReader={this.readCookies.bind(this)} /> : <LogoutButton cookieReader={this.readCookies.bind(this)} />

    return (
      <div>
      {LoginLogoutView}
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