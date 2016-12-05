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

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    console.log('event', event);
    // this.setState({
    //   currentSearch: event.target.value,
    // });
  }

  render() {
    return (
      <div className="card">
        <form>
          <span>Find a nearby project</span><br />
          <label>
            City:
          </label>
          <Typeahead 
            onInputChange={this.handleChange}
            onSubmit={console.log('submitting')}
            options={this.props.projects}
            labelKey="name"
            emptyLabel="No projects found in this city."
            renderMenuItemChildren={(props, option, idx) => {
              return (
                <div>
                  <em>{option.address.city}
                  </em><br /  >
                  <small>{option.description}
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
