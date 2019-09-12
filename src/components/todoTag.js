import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {action} from 'mobx';

@observer
export default class TodoTag extends React.Component {
	render() {
        console.log(this.props);
        return (
            <p>todo tag works</p>
        );
    }
}

TodoTag.propTypes = {
    viewStore: PropTypes.object.isRequired,
    tagStore: PropTypes.object.isRequired,
    todo: PropTypes.object.isRequired,
};
