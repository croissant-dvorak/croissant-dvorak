var React = require('react');
var data = require('../data');
var Buttons = require('./buttons.js');
class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        	data: null,
        	projectEntry: false
        };
    }
    componentDidMount() {
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

    render() {
    	// var someComponent = this.state.projectEntry ? <ProjectCompoinent/> : <SomeOther />
    	//add this in the return statement>>>> { someComponent }

        return ( 
        	 
        	<Buttons addProject={this.addProjectClick.bind(this)} /> 
        	);
    }
}



module.exports = App;
