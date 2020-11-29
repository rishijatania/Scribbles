import React, { Component } from 'react';
import '../App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class ToDoForm extends Component {
	constructor (props) {
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this) 
		this.state={
			description:"",
			owner:""
		};
	}

	handleChange(event){ 
		this.setState({ 
		  // Computed property names 
		  // keys of the objects are computed dynamically 
		  [event.target.id] : event.target.value 
		}) 
	  } 
	onSubmit(event) {
		event.preventDefault();
		var description =this.state.description;
		var owner = this.state.owner;
		if (description && owner) {
			this.props.addItem({description,owner});
			this.refs.form.reset();
		}
	}
	render() {
		return (
			<form ref="form" onSubmit={this.onSubmit} className="form-inline" style={{padding:'10px'}} >
				<TextField id="description" label="ToDoTask" variant="outlined" 
					style={{padding:'10px'}}
					onChange={this.handleChange} required/>
				<TextField id="owner" label="Owner Name" variant="outlined" 
					style={{padding:'10px'}}
					color="primary"
					onChange={this.handleChange} required/>

				<Button type="submit" variant="contained" color="primary">
					Add Note
				</Button>
			</form>
		);
	}
}

export default ToDoForm