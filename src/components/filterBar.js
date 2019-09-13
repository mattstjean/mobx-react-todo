import { observer } from "mobx-react";
import PropTypes from 'prop-types';
import React from 'react';


@observer
export default class FilterBar extends React.Component {

    render() {
        const {viewStore, tagStore} = this.props;
        return 'filter bar works';
    }
}

FilterBar.propTypes = {
    viewStore: PropTypes.object.isRequired,
    tagStore: PropTypes.object.isRequired,
};
