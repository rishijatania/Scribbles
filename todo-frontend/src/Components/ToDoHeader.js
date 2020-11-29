import React, { Component } from 'react';
import '../App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

class ToDoHeader extends Component {
	render() {
		return (
			<AppBar>
				<Toolbar>
					<Typography variant="h6">To-Do List</Typography>
				</Toolbar>
			</AppBar>
		)
	}
}
export default ToDoHeader