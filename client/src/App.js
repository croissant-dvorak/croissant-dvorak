var React = require('react');
var ProjectList = require('./ProjectList');
require('whatwg-fetch');

var data = require('../data');
var Buttons = require('./buttons.js');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
	  data: null,
      projectEntry: false,
      projects : []
    };

  }

  componentDidMount () {
    this.fetchProjects();
	this.getProjects();
  }

	getProjects() {
    	console.log('we did it!!!')
        $.ajax({
            url: '/projects',
            success: function(data) {
                this.setState({ data: data });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

	addProjectClick(){
    	console.log('the click function worked!')
    	this.setState({
    		projectEntry: true
    	})
    }

  fetchProjects(){
    fetch('./projects')
      .then(function(res){
        console.log('res', res);
        return res.json();
      })
      .catch(function(err){
        console.error('err', err);
      })
      .then((function(json){
        this.setState({projects: json});
        console.log('setting state!')
      }).bind(this));
  }

  render() {
		// var someComponent = this.state.projectEntry ? <ProjectCompoinent/> : <SomeOther />
    	//add this in the return statement>>>> { someComponent }
    return (
      <div>
        <ProjectList projects={this.state.projects} />
        <div> Hello page </div>
      </div>
    );
  }
}


module.exports = App;