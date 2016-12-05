const React = require('react');
const ProjectListItem = require('./ProjectListItem.jsx');

const ProjectList = props => (
  <div>
    {props.projects.map((proj, idx) => <ProjectListItem project={proj} key={idx} viewProject={props.viewProject} />)}
  </div>
);

module.exports = ProjectList;
