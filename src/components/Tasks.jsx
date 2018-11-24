import React from 'react';
import PropTypes from 'prop-types';

const Tasks = props =>
	<ul className="task-list">
		{ props.children }
	</ul>

const Task = props =>
	<li
		onClick={ props.onClick }
		className={ `task-list__item${ props.isCompleted ? ' is-completed' : '' }` }>
		{ props.children }
	</li>

Task.propTypes = {
	isCompleted: PropTypes.bool,
	children: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
};

Task.defaultProps = {
	isCompleted: false,
};

export { Task, Tasks };
