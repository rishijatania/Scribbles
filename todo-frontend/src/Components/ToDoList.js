import React, { Component } from 'react';
import '../App.css';
import ToDoListItem from './ToDoListItems';

class ToDoList extends Component {
	render() {
		if(this.props.items != undefined){
			var items = this.props.items.map((item, index) => {
				return (
					<ToDoListItem key={index} item={item} index={index} removeItem={this.props.removeItem} markTodoDone={this.props.markTodoDone} />
				);
			});
			return (
				<ul className="list-group"> {items} </ul>
			);
		}
	}
}
export default ToDoList