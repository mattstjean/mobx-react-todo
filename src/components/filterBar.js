import { observer } from "mobx-react";
import PropTypes from 'prop-types';
import React from 'react';
import '../styles/filterBar.css';
import { Chip, Button } from "@material-ui/core";
import { action, computed, observable } from "mobx";
import FilterListOutlinedIcon from '@material-ui/icons/FilterListOutlined';



@observer
export default class FilterBar extends React.Component {

    render() {
        const {viewStore, tagStore} = this.props;
        return (this.TagView());
    }

    getTagsAsArray() {
		return ( Array.from( this.props.tagStore.tags ) );
    }
    
    TagView() {
        return (
            <div className='filter-bar'>
                <FilterListOutlinedIcon className='filter-icon' />
                <ul className='tag-list'>
				    { this.getTagsAsArray().map( ([key, val], i) => (
						<li key={i}>
                            <Chip variant='outlined'
                                onClick = { () => {
                                    this.toggle(key, i);
                                }}
                                label={key + ' (' + val + ')'}
                                className='filter-tag'
                                color={
                                    this.isTagBeingFiltered(key) ?
                                        'primary' : 'default'
                                }
                            />
                        </li>
					)) }
			    </ul>
            </div>

            
        );
    }

    toggle(key, i) {
        if (this.isTagBeingFiltered(key)) {
            console.log('remove ' + key + ' from filter list');
            this.removeTagFromFilters(key, i);
        } else {
            console.log('add ' + key + ' to filter')
            this.addTagToFilters(key);
        }
    }

    @action
    addTagToFilters(key) {
        this.props.viewStore.tagFilter.push(key);
    }
    @action
    removeTagFromFilters(key, i) {
        this.props.viewStore.tagFilter.remove(key);
    }
    
    isTagBeingFiltered(tag) {
        return this.props.viewStore.tagFilter.includes(tag);
    }
}

FilterBar.propTypes = {
    viewStore: PropTypes.object.isRequired,
    tagStore: PropTypes.object.isRequired,
};
