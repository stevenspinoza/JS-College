'use strict';

import React from 'react';
import { connect } from 'react-redux';

class Details extends React.Component {
    constructor() {
        super();
    }

    render() {
        const { reducer } = this.props;
		
		//console.log (reducer);
		
        return (
            <div>
                <p><strong>Market name:</strong> { reducer.market.name }</p>
                <p><strong>Market phone:</strong> { reducer.market.phone_number }</p>
            </div>
        );
    }
}

Details.propTypes = {
    reducer: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        reducer: state.detailsReducer
    };
}

Details = connect(
    mapStateToProps
)(Details);

export default Details;