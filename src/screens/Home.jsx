import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import axios from 'axios';

export default class Home extends Component {
	state = { name: '', shouldMoveToNextPage: false, errors: {} }

	onSubmit = e => {
		e.preventDefault();

		if (this.state.name) {
			axios.post('http://127.0.0.1:5000/register', { name: this.state.name })
				.then(_ => this.setState({ shouldMoveToNextPage: true }))
				.catch(error => this.setState({ errors: error.response.data.errors }));
		}
	}

	render () {
		if (this.state.shouldMoveToNextPage) {
			return <Redirect to={ `/todoList/${this.state.name}` } />
		}

		return (
			<div className="container is-centered">
				<h2 className="welcome-message smooth-animated-underline text-uppercase text-center">
					Welcome to <span className="welcome-message--special">TODO</span> App
				</h2>

				<form onSubmit={ this.onSubmit } className="form text-center mt-50">
					<input
						type="text"
						className='input-box'
						placeholder="Enter your name"
						onChange={ e => this.setState({ name: e.target.value }) }
						value={ this.state.name }
						required/>

					<button
						type="submit"
						className="button">Okay</button>
				</form>
			</div>
		)
	}
}
