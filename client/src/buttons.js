var React = require('react');

const Buttons = ({addProject}) => {
	return (
  	<div>
  		<button className="btn btn-info" onClick={() => addProject()}><a href='#'>Add a Project</a></button>
  		<button className="btn btn-info">Give Feedback on a Project</button>
  	</div>
	);
}

module.exports = Buttons;