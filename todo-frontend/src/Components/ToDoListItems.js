import React, { Component } from 'react';
import '../App.css';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		color: theme.palette.text.primary,
	},
}));

class ToDoListItems extends Component {
	constructor (props) {
		super(props);
		this.onClickClose = this.onClickClose.bind(this);
		this.onClickDone = this.onClickDone.bind(this);
	}
	onClickClose() {
		this.props.removeItem(this.props.item);
	}
	onClickDone(event) {
		this.props.markTodoDone(this.props.item);
	}
	render() {
		return (
			<li className="list-group-item ">
				<Checkbox id={this.props.item.id}
					checked={this.props.item.finished}
					onChange={this.onClickDone}
					color={'primary'}
					inputProps={{ 'aria-label': 'secondary checkbox' }}
				/>
				<span>
					{this.props.item.description}
				</span>
				<span>
					- ( {this.props.item.owner} )
				</span>
				<DeleteIcon 
					onClick={this.onClickClose}
					color={'secondary'} />
			</li>
		);
	}
}

export default ToDoListItems