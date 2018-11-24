import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import './assets/sass/app.sass';

import Home from './screens/Home';
import TodoList from './screens/TodoList';

ReactDOM.render(
	<BrowserRouter>
		<div>
			<Route component={ Home } path="/" exact />
			<Route component={ TodoList } path="/todoList/:name" exact />
		</div>
	</BrowserRouter>,
	document.getElementById('root')
)
