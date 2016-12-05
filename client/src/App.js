const React = require('react');
const ProjectList = require('./ProjectList.jsx');
const FindNearbyProject = require('./FindNearbyProject.jsx');
const AddProject = require('./AddProject.jsx');
const Buttons = require('./Buttons.jsx');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      projectEntry: false,
      projects: [],
    };
  }

  componentDidMount () {
    this.getProjects();
  }

  getProjects() {
      console.log('we did it!!!');
        $.ajax({
            url: 'http://localhost:4040/projects',
            success: function(data) {
                this.setState({ data: JSON.parse(data) });
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

  render() {
		var projectEntryComponent = this.state.projectEntry ? <AddProject closeAddProject={this.closeAddProjectClick.bind(this)} /> :  <ProjectList projects={this.state.data} />

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
            <FindNearbyProject projects={this.state.data} />
          </div>
        </div>
      </div>
    );
  }
}


module.exports = App;