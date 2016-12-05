var React = require('react');

const Buttons = ({addProject}) => {
  return (
    <div className="row">
      <button className="btn btn-info col-md-5 offset-md-1" onClick={() => addProject()}><a href='#'>Add a Project</a></button>
      <button className="btn btn-info col-md-5">Give Feedback on a Project</button>
    </div>
  );
};

module.exports = Buttons;
