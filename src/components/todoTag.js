import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import { computed, action, observable, toJS } from 'mobx';
import ChipInput from 'material-ui-chip-input';
import '../styles/todoTag.css';

@observer
export default class TodoTag extends React.Component {

	render() {
        const {viewStore, tagStore, todo} = this.props;
        // return (this.isTagsBeingEdited ? this.EditTagView() : this.DefaultTagView());
        return (this.EditTagView());
    }

    @computed
	get isTagsBeingEdited() {
		return this.props.viewStore.todoEditingTags === this.props.todo;
    }
    
    @computed
    get tags() {
        return this.props.todo.tags;
    }
    
    DefaultTagView() {
        return (
            <div className="tag-wrapper">
                <ul className="todo-tag-list">
                    { this.tags.slice().map( (tag, i) => (
                        <li key={tag}>
                            {tag}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    EditTagView() {
        return (
            <div className="tag-input-wrapper">
                <ChipInput
                    fullWidth
                    placeholder='Type and press enter to add tags'
                    className='tag-input'
                    value={this.tags.slice()}
                    onAdd={(tag) => this.handleAddTag(tag)}
                    onDelete={(tag, index) => this.handleDeleteTag(tag, index)}
                />
            </div>
        );
    }

    @action
	handleAddTag = (tag) => {
        // push tag to the local array for view and todo
        // specific purposes
        this.tags.push(tag);
        // push tag to tagStore for tracking all unique tags
        // for use by filtering
        this.props.tagStore.addTag(tag);
    };
    
    @action
    handleDeleteTag = (tag, index) => {
        // splice tag from local array to remove from view and
        // from the todo
        this.tags.splice(index, 1);
        // remove tag from tagStore to update the tracked tag data
        this.props.tagStore.removeTag(tag);
    };
}

TodoTag.propTypes = {
    viewStore: PropTypes.object.isRequired,
    tagStore: PropTypes.object.isRequired,
    todo: PropTypes.object.isRequired,
};
