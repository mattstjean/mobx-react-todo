import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {observable, action, computed} from 'mobx';
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import IconButton from '@material-ui/core/IconButton';
import '../styles/todoItem.css';
import TodoTag from './todoTag';

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

@observer
export default class TodoItem extends React.Component {
	@observable editText = "";
	render() {
		const {todo, viewStore, tagStore} = this.props;
		console.log(this.props);
		return (
			<li className={[
				todo.completed ? "completed": "",
				this.isBeingEdited ? "editing" : ""
			].join(" ")}>
				<div className="view">
					<div className="view-row">
						<input
							className="toggle"
							type="checkbox"
							checked={todo.completed}
							onChange={this.handleToggle}
						/>
						<label onDoubleClick={this.handleEdit}>
							{todo.title}
						</label>
						<div className='edit-tag-btn'>
							<IconButton aria-label="edit tags" disableFocusRipple disableRipple onClick={this.handleEditTags}>
								<LocalOfferOutlinedIcon />
							</IconButton>
						</div>
						<div className='delete-todo-btn'>
							<IconButton aria-label="delete todo" disableFocusRipple disableRipple onClick={this.handleDestroy}>
								<DeleteOutlinedIcon />
							</IconButton>
						</div>
					</div>
					<TodoTag todo={todo} viewStore={viewStore} tagStore={tagStore} />
				</div>
				<input
					ref="editField"
					className="edit"
					value={this.editText}
					onBlur={this.handleSubmit}
					onChange={this.handleChange}
					onKeyDown={this.handleKeyDown}
				/>
			</li>
		);
	}

	@computed
	get isBeingEdited() {
		return this.props.viewStore.todoBeingEdited === this.props.todo
	}

	@action
	handleSubmit = (event) => {
		const val = this.editText.trim();
		if (val) {
			this.props.todo.setTitle(val);
			this.editText = val;
		} else {
			this.handleDestroy();
		}
		this.props.viewStore.todoBeingEdited = null;
	};

	@action
	handleDestroy = () => {
		this.props.todo.destroy();
		this.props.viewStore.todoBeingEdited = null;
	};

	@action
	handleEditTags = () => {
		const todo = this.props.todo;
		this.props.viewStore.todoEditingTags = todo;
	};

	@action
	handleEdit = () => {
		const todo = this.props.todo;
		this.props.viewStore.todoBeingEdited = todo;
		this.editText = todo.title;
	};

	@action
	handleKeyDown = (event) => {
		if (event.which === ESCAPE_KEY) {
			this.editText = this.props.todo.title;
			this.props.viewStore.todoBeingEdited = null;
		} else if (event.which === ENTER_KEY) {
			this.handleSubmit(event);
		}
	};

	@action
	handleChange = (event) => {
		this.editText = event.target.value;
	};

	@action
	handleToggle = () => {
		this.props.todo.toggle();
	};

	@action
	handleAddTag = () => {
		/* todo */
	}
}

TodoItem.propTypes = {
	todo: PropTypes.object.isRequired,
	viewStore: PropTypes.object.isRequired,
	tagStore: PropTypes.object.isRequired,
};
