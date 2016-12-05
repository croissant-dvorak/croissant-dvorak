var React = require('react');

const Buttons = ({addProject}) => {
	return (
	<div>
		<div className="navButtons" onClick={() => addProject()}><a href='#'>Add a Project</a></div>
		<div className="navButtons">Give Feedback on a Project</div>
	</div>
	);
}

module.exports = Buttons;