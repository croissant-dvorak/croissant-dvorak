var React = require('react');
var data = require('../data');
var Buttons = require('./buttons.js');
class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        	data: null
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

    render() {
        return ( < Buttons /> );
    }
}



module.exports = App;
