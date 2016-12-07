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
        $('#successMessage').html('<span id="alertFadeOut" style="display: block; position: absolute; left: 45%; top: 55%; z-index: 1; width: 10%; text-align: center; background-color: pink;" >Success! Your project was saved!</span>')
        $('#alertFadeOut').fadeOut(3000, function () {
              $('#alertFadeOut').remove();
          }); 
        viewProject(projectPost);
      }  
    })
  }.bind(this)



  return (
    <div>
      <form id="projectPostForm" onSubmit={postForm}>
        <button className="btn back-btn" onClick={() => viewHome()}><a href='#'>Back</a></button>
        <label htmlFor="name">Project Name</label>
        <input type="text" placeholder="Project Name" name="name" className="form-control"></input>
        <label for="description">Project Description</label>
		<input type="text" placeholder="Project Description" name="description" className="form-control"></input>
			
			<label for="street">Project Address</label>
			<input type="text" placeholder="Street" name="street" className="form-control"></input>
			<input type="text" placeholder="Street 2 (optional)" name="street2" className="form-control"></input>
			<input type="text" placeholder="City" name="city" className="form-control"></input>			
			<input type="text" placeholder="State" name="state" className="form-control"></input>
			<input type="text" placeholder="Country" name="country" className="form-control"></input>
			<input type="number" placeholder="Zip Code" name="zip" className="form-control"></input>

			<label for="lat">Project Latitude & Longitude</label>

			<input type="number" placeholder="Latitude" name="lat" step="any" className="form-control"></input>
			<input type="number" placeholder="Longitude" name="long" step="any" className="form-control"></input>

			<label for="">Approximate Start Date</label>
			<input type="date" name="startDate" className="form-control"></input>
			<label for="">Approximate Completion Date</label>
			<input type="date" name="compDate" className="form-control"></input>	
        <input type="file" name="picture" accept="image/*" className="form-control-file file-upload"></input>
        <input type="submit" value="Add Project" className="btn" ></input>
      </form>  
    </div>
  );
}

module.exports = AddProject;



  
//create closeProject function that changes state to false in App.js