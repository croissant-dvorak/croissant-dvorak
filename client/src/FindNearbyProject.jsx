const React = require('react');
var Typeahead = require('react-bootstrap-4-typeahead').default;
var data = require('../data.js');
// import Typeahead from 'react-bootstrap-typeahead';

class FindNearbyProject extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentSearch: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
  }

  handleInputChange(event) {
    console.log('event', event);
    // this.setState({
    //   currentSearch: event.target.value,
    // });
  }

  handleSelection(event) {
    console.log('selected', event[0].name);
    // this.setState({
    //   currentSearch: event.target.value,
    // });
  }

  render() {
    var myData =  [{name:'Austin', count: 11}, {name:'Dallas', count: 1}];

    return (
      <div className="card">
        <form className="sidebar">
          <span>Find a nearby project:</span><br />
          <label>
          </label>
          <Typeahead 
            onInputChange={this.handleInputChange}
            onChange={this.handleSelection}
            options={myData}
            labelKey="name"
            placeholder="Enter City"
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
