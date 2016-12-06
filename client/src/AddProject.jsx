var React = require('react');

const AddProject = (props) => {

var viewProject = props.viewProject;
  var viewHome = props.viewHome;

  
  var postForm = function(e) {
    e.preventDefault();
    console.log("in postForm function");

    var formData = new FormData($('#projectPostForm')[0]);
    console.log("formData ", formData);

    $.ajax({
      url: 'http://localhost:4040/api/projects',
      type: 'POST',
      data: formData,
      contentType: false,
      processData: false,
      success: function(projectPost) {
        console.log("Posted a project ", projectPost);
        alert("success!");
        // viewProject();
      }  
    })
  }.bind(this)

  return (
    <div>
      <form id="projectPostForm" onSubmit={postForm}>
        <div onClick={() => viewHome()}><a href='#'>X</a></div>
        <label htmlFor="name">Project Name</label>
        <input type="text" placeholder="Project Name" name="name"></input>
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
			<input type="number" placeholder="Latitude" name="lat" step="any" required="required"></input>
			<input type="number" placeholder="Longitude" name="long" step="any" required="required"></input>

			<label for="">Approximate Start Date</label>
			<input type="date" name="startDate" required="required"></input>
			<label for="">Approximate Completion Date</label>
			<input type="date" name="compDate" required="required"></input>	
        <input type="file" name="picture" accept="image/*"></input>
        <input type="submit" value="Add Project"></input>
      </form>  
    </div>
  );
}

module.exports = AddProject;



  
//create closeProject function that changes state to false in App.js