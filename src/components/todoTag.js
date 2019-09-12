import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {action} from 'mobx';

@observer
export default class TodoTag extends React.Component {
	
}

TodoTag.propTypes = {
    viewStore: PropTypes.object.isRequired,
	todoStore: PropTypes.object.isRequired
};
