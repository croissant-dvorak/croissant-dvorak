import React, { Component } from 'react';

class SearchBar extends Component {
//define new class and give it functionality that React Comp. has
	constructor(props){
	//constructor function is called every time a new instance
	//of an class-based object is called

	super(props);
	//calling the parent method with super

	this.state = { term: ''}
	//we initialize it with an object assigned to this.state
	//obj contains properties for this state
}


	render(){
	//to render class-based component, must have render method
		//and return some jsx/html
		return (
			<div>
			<input 
			value={this.state.term}

			onChange={
				event => this.onInputChange(event.target.value)} />
			</div>
		)
	//user triggers an event on change, then the component re-renders
	//on rerender, sets the value to what was saved in the state
	}

	onInputChange(term){
		this.setState({term});
		this.props.onSearchTermChange(term);
	}

	
}

export default SearchBar;
//allows us to import SearchBar from any other file