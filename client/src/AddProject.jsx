var React = require('react');

const AddProject = (props) => {

	var afterPost = function() {
		$("#addProjectForm").submit(function(event){
			event.preventDefault();
			console.log("post worked!")
		})
	}

	return (
	<div>
		<form action="/api/projects/" method="post" name="addProjectForm">
			<div onClick={() => props.closeAddProjectClick()}><a href='#'>X</a></div>
			<label for="name">Project Name</label>
			<input type="text" placeholder="Project Name" name="name" required="required"></input>
			
			
			<label for="description">Project Description</label>
			<input type="text" placeholder="Project Description" name="description" required="required">Project Description</input>
			
			<label for="street">Project Address</label>
			<input type="text" placeholder="Street" name="street" required="required"></input>
			<input type="text" placeholder="Street Cont'd" name="street2"></input>
			<input type="text" placeholder="City" name="city" required="required"></input>			
			<input type="text" placeholder="State" name="state" required="required"></input>
			<input type="text" placeholder="Country" name="country" required="required"></input>
			<input type="number" placeholder="Zip Code" name="zip" required="required"></input>

			<label for="lat">Project Latitude & Longitude</label>
			<input type="number" placeholder="Latitude" name="lat" required="required"></input>
			<input type="number" placeholder="Longitude" name="long" required="required"></input>

			<label for="">Approximate Start Date</label>
			<input type="date" name="startDate" required="required"></input>
			<label for="">Approximate Completion Date</label>
			<input type="date" name="compDate" required="required"></input>
			<input type="submit" value="Add Project"></input>
		</form>	
	</div>
	);
}

module.exports = AddProject;

//create closeProject function that changes state to false in App.js