import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import { computed } from 'mobx';
import ChipInput from 'material-ui-chip-input';
import '../styles/todoTag.css';

@observer
export default class TodoTag extends React.Component {
	render() {
        const {viewStore, tagStore, todo} = this.props;
        return (this.isTagsBeingEdited ? <this.EditTagView /> : <this.DefaultTagView />);
    }

    @computed
	get isTagsBeingEdited() {
		return this.props.viewStore.todoEditingTags === this.props.todo;
    }
    
    DefaultTagView() {
        return (
            <p> Not editing! </p>
        );
    }

    EditTagView() {
        return (
            <ChipInput
                fullWidth
                label='Tags'
                placeholder='Type and press enter to add tags'
                className='chip-input'
            />
        );
    }
}

TodoTag.propTypes = {
    viewStore: PropTypes.object.isRequired,
    tagStore: PropTypes.object.isRequired,
    todo: PropTypes.object.isRequired,
};
