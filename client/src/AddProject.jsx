var React = require('react');

const AddProject = ({closeAddProject}) => {
	return (
	<div>
		<form>
			<div onClick={() => closeAddProject()}><a href='#'>X</a></div>
			<input type="text" placeholder="Project Name" name="name" required="required">Project Name</input>
			<input type="text" placeholder="Project Owner" name="owner" required="required">Project Owner</input>
			<input type="text" placeholder="Project Description" name="description" required="required">Project Description</input>

			<input type="text" placeholder="Street" name="street" required="required">Location</input>
			<input type="text" placeholder="Street Cont'd" name="street2"></input>
			<input type="text" placeholder="City" name="city" required="required"></input>			
			<input type="text" placeholder="State" name="state" required="required"></input>
			<input type="text" placeholder="Country" name="Country" required="required"></input>
			<input type="number" placeholder="Zip Code" name="zip" required="required"></input>

			<input type="number" placeholder="Latitude" name="lat" required="required"></input>
			<input type="number" placeholder="Longitude" name="long" required="required"></input>

			<input type="date" name="compDate" required="required">Approximate Start Date</input>
			<input type="date" name="startDate" required="required">Approximate Completion Date</input>
			<input type="submit">Add Project!</input>
		</form>	
	</div>
	);
}

module.exports = AddProject;

//create closeProject function that changes state to false in App.js