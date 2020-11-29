import React, { Component } from 'react';
import './App.css';
import ToDoHeader from './Components/ToDoHeader';
import ToDoList from './Components/ToDoList';
import ToDoForm from './Components/ToDoForm';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Toolbar from '@material-ui/core/Toolbar';
import ScrollTop from './Components/ScrollTop';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const WEBAPP_URL = window._env_.REACT_APP_WEBAPP_URL == undefined ? "http://localhost:8080" : window._env_.REACT_APP_WEBAPP_URL;
const MIDDLEWARE_URL = window._env_.REACT_APP_MIDDLEWARE_URL == undefined ? "http://localhost:5000" : window._env_.REACT_APP_MIDDLEWARE_URL;
//"https://cors-anywhere.herokuapp.com/http://localhost:8080"
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 2,
	},
	control: {
		padding: theme.spacing(2),
	},
}));

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}
class App extends Component {
	constructor (props) {
		super(props);
		this.addItem = this.addItem.bind(this);
		this.removeItem = this.removeItem.bind(this);
		this.markTodoDone = this.markTodoDone.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.state = {
			todoItems: [],
			error:{
				errorMessage:"",
				timeStamp:"",
				apiCall:""
			},
			open : false
		};
	}

	

	componentDidMount() {
		this.getItems();
	}

	getItems(){
		console.log(`${WEBAPP_URL}/api/todolist`);
		fetch(`${WEBAPP_URL}`, {
			crossDomain: true,
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Headers": "*",
				"X-Requested-With":"XMLHttpRequest"
			}
		}
		).then(response => {
			if (!response.ok) {
				this.setState({ error: {
					error:response.body, 
					timeStamp: Date(),
					apiCall:'GET'
				}});
				return [];
			}
			else {
				return response.json();
			}
		}).then(data => {
			// console.log(data);
			this.setState({ todoItems: data.items === undefined ? [] : data.items });
		}).catch(error => {
			this.setState({ error: {
				error:error, 
				timeStamp: Date(),
				apiCall:'GET'
			}});
		});
	}

	addItem(todoItem) {
		console.log(`${MIDDLEWARE_URL}/api/todolist`);
		fetch(`${MIDDLEWARE_URL}`, {
			crossDomain: true,
			method: "POST",
			body:JSON.stringify(todoItem),
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Headers": "*",
				"X-Requested-With":"XMLHttpRequest"
			}
		}
		).then((response) => {
			if (!response.ok) {
				this.setState({ error: {
					error:response.body, 
					timeStamp: Date(),
					apiCall:'POST'
				}});
			}
			else {
				this.getItems();
				this.setState({ 
					open:  true
				});
			}
		}).catch(error => {
			this.setState({ error: {
				error:error, 
				timeStamp: Date(),
				apiCall:'POST'
			}});
		});
	}
	removeItem(item) {
		console.log(`${MIDDLEWARE_URL}/api/todolist`);
		fetch(`${MIDDLEWARE_URL}/${item.id}`, {
			crossDomain: true,
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Headers": "*",
				"X-Requested-With":"XMLHttpRequest"
			}
		}
		).then((response) => {
			if (!response.ok) {
				this.setState({ error: {
					error:response.body, 
					timeStamp: Date(),
					apiCall:'DEL'
				}});
			}
			else {
				this.getItems();
				this.setState({ 
					open:  true
				});
			}
		}).catch(error => {
			error.message = 'Middleware Services are down.'
			this.setState({ error: {
				error:error, 
				timeStamp: Date(),
				apiCall:'DEL'
			}});
		});
	}

	handleClose = (event, reason) => {
		this.setState({ 
			open: false
		});
	};

	markTodoDone(item) {
		console.log(`${MIDDLEWARE_URL}/api/todolist`);
		item.finished = !item.finished;
		fetch(`${MIDDLEWARE_URL}`, {
			crossDomain: true,
			method: "PUT",
			body:JSON.stringify(item),
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Headers": "*",
				"X-Requested-With":"XMLHttpRequest"
			}
		}
		).then((response) => {
			if (!response.ok) {
				this.setState({ error: {
					error:response.body, 
					timeStamp: Date(),
					apiCall:'PUT'
				}});
			}
			else {
				this.getItems();
				this.setState({ 
					open:  true
				});
			}
		}).catch(error => {
			error.message = 'Middleware Services are down.'
			this.setState({ error: {
				error:error, 
				timeStamp: Date(),
				apiCall:'PUT'
			}});
		});
	}

	render() {
		return (
			<div id="main" >
				<p>REACT_APP_WEBAPP_URL: {window._env_.REACT_APP_WEBAPP_URL}</p>
				<p>REACT_APP_WEBAPP_URL: {window._env_.REACT_APP_MIDDLEWARE_URL}</p>
				<ToDoHeader />
				<Toolbar id="back-to-top-anchor" />
				<Grid container className={useStyles.root} spacing={2}>
					<Grid item xs={3}>
						<Paper elevation={6} style={{ backgroundColor: '#f4f4f2' }}>
							<ToDoForm addItem={this.addItem} />
						</Paper>
					</Grid>
					<Grid item xs={9}>
						<Paper elevation={10} style={{ backgroundColor: '#f4f4f2' }}>
							<ToDoList items={this.state.todoItems} removeItem={this.removeItem} markTodoDone={this.markTodoDone} />
						</Paper>
					</Grid>
				</Grid>
				
				<ScrollTop>
					<Fab color="secondary" size="small" aria-label="scroll back to top">
						<KeyboardArrowUpIcon />
					</Fab>
				</ScrollTop>
				{/* ref = {this.snackbarRef}  */}
				<Snackbar open={this.state.open} autoHideDuration={3000} onClose={this.handleClose}>
					<Alert onClose={this.handleClose} severity="success">
						This is a success message!
					</Alert>
				</Snackbar>
			</div>
		);
	}
}

export default App