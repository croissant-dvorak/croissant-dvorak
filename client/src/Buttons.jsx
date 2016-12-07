var React = require('react');

const Buttons = ({addProject}) => {
  return (
    <div className="row">
      <button className="btn log col-md-5 offset-md-1" onClick={() => addProject()}><a href='#'>Add a Project</a></button>
    </div>
  );
};

module.exports = Buttons;
