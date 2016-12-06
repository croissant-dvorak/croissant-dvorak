var React = require('react');

const AddProject = (props) => {

	var viewProject = props.viewProject;
	var viewHome = props.viewHome;

	
	var postForm = function(e) {
		console.log("in postForm function")

      e.preventDefault();
      return $.ajax({
		    url: '/api/projects',
		    type: 'POST',
		    data: $("#projectPostForm").serialize(),
		    success: function(projectPost){
		      console.log("Posted a project ", projectPost);
		      alert("success!")
		      viewProject()
	  		}  
  		})
	}


	return (
	<div>
		<form id="projectPostForm" onSubmit={postForm}>
			<div onClick={() => viewHome()}><a href='#'>X</a></div>
			<label for="name">Project Name</label>
			<input type="text" placeholder="Project Name" name="name" required="required"></input>	
			
			
			<input type="submit" value="Add Project"></input>
		</form>	
	</div>
	);
}

module.exports = AddProject;

//create closeProject function that changes state to false in App.js