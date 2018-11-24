import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import io from './../utils/SocketIO';
import { Task, Tasks } from './../components/Tasks';

export default class TodoList extends Component {
	state = { name: '', tasks: [], newTask: '', redirectToHome: false }

	componentDidMount () {
		this.setState({ name: this.props.match.params.name }, () => {
			axios.get(`http://127.0.0.1:5000/tasks/${this.state.name}`)
				.then(({data}) => {
					this.setState({ tasks: data.data.tasks});
				})
				.catch(error => {
					if (error.response.status === 301) {
						this.setState({ redirectToHome: true });
					}
				});
		});

		io.on('connect', () => {
			io.on('newTaskadded', (newTask) => {
				if (newTask.name === this.state.name) {
					this.setState({ tasks: this.state.tasks.concat([newTask]) } , () => this.setState({ newTask: '' }));
				}
			});
		});

	}

	addNewTask = e => {
		e.preventDefault();

		io.emit('addNewTask', { description: this.state.newTask, name: this.state.name });
	}

	changeTaskCompletionStatus = i => {
		this.setState({
			tasks: this.state.tasks.map((task, j) => {
				if (i === j) {
					task.completed_at = ! task.completed_at ? new Date().toUTCString() : null;
				}

				return task;
			})
		})
	}

	render () {
		if (this.state.redirectToHome) {
			return <Redirect to="/" />
		}

		return (
			<div className="container is-centered">
				<p className="heading smooth-animated-underline text-uppercase">
					Your tasks {this.state.name}
				</p>

				<form className="form mt-50 box" onSubmit={ this.addNewTask }>
					<input
						type="text"
						className="input-box"
						placeholder="Enter your task here"
						onChange={ e => this.setState({ newTask: e.target.value }) }
						value={ this.state.newTask }
						required/>

					<button type="submit" className="button">ADD</button>
				</form>

				{
					this.state.tasks.length ?
					<Tasks>
						{ this.state.tasks.map((task, i) =>
							<Task
								onClick={ e => this.changeTaskCompletionStatus(i) }
								isCompleted={ task.completed_at }
								key={i}
							>
								{ task.description }
							</Task>
						)}
					</Tasks>
					: <p className="mt-50">You haven't added your tasks yet. Please start adding them.</p>
				}
			</div>
		)
	}
}
