const React = require('react');
var Typeahead = require('react-bootstrap-4-typeahead').default;
const _ = require('lodash'); // needed to debounce

class FindNearbyProject extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentSearch: '',
      projects: [],
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.fetchProjectsForCity = _.debounce(this.fetchProjectsForCity.bind(this), 500);
  }

  fetchProjectsForCity(city){
    $.ajax({
      url: window.apiBase + 'projects',
      data: {name: city},
      success: function(projects) {
          this.setState({ projects: projects });
      }.bind(this),
      error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
      }.bind(this),
    });
  }

  handleInputChange(event) {
    this.fetchProjectsForCity(event);
  }

  handleSelection(event) {
    this.props.viewProject(event[0]);
  }

  render() {
    return (
      <div className="card">
        <form className="sidebar">
          <span>Find a nearby project:</span><br />
          <label>
          </label>
          <Typeahead
            onInputChange={this.handleInputChange}
            onChange={this.handleSelection}
            options={this.state.projects}
            labelKey="city"
            placeholder="Enter a city"
            emptyLabel="No projects found in this city."
            renderMenuItemChildren={(props, option, idx) => {
              return (
                <div>
                  <em>{option.name}
                  </em><br />
                  <small>{option.count} {option.count > 1 ? 'Projects' : 'Project'}
                  </small>
                </div>
              )
            }}
            />
        </form>
      </div>
    );
  }
}

module.exports = FindNearbyProject;
            // <input placeholder="Austin" type="text" value={this.state.currentSearch} onChange={this.handleChange} /><br />
