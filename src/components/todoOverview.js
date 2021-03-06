import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import { ACTIVE_TODOS, COMPLETED_TODOS } from '../constants';

import TodoItem from './todoItem';

@observer
export default class TodoOverview extends React.Component {
	render() {
		const {todoStore, viewStore, tagStore} = this.props;
		if (todoStore.todos.length === 0)
			return null;
		return <section className="main">
			<ul className="todo-list">
				{this.getVisibleTodos().map(todo =>
					(<TodoItem
						key={todo.id}
						todo={todo}
						viewStore={viewStore}
						tagStore={tagStore}
					/>)
				)}
			</ul>
		</section>
	}

	getVisibleTodos() {
		let filteredTodos = this.props.todoStore.todos.filter(todo => {
			switch (this.props.viewStore.todoFilter) {
				case ACTIVE_TODOS:
					return !todo.completed;
				case COMPLETED_TODOS:
					return todo.completed;
				default:
					return true;
			}
		});

		filteredTodos = filteredTodos.filter(todo => {
			// only show the todo if it includes all the tags currently
			// being used for filtering
			return this.props.viewStore.tagFilter.every(tag => {
				return todo.tags.indexOf(tag) >= 0;
			})
		});

		return filteredTodos;
	}

	getTagsAsArray() {
		return ( Array.from( this.props.tagStore.tags ) );
	}

	toggleAll = (event) => {
		var checked = event.target.checked;
		this.props.todoStore.toggleAll(checked);
	};
}


TodoOverview.propTypes = {
	viewStore: PropTypes.object.isRequired,
	todoStore: PropTypes.object.isRequired,
	tagStore: PropTypes.object.isRequired,
}
