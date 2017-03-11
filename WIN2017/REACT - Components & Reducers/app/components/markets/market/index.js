'use strict';

import React from 'react';
//import Provider from './provider';
import { connect } from 'react-redux';

// Import the action(s)
import { setMarket } from './actions';

class Market extends React.Component {
	
	constructor() {
		super();
		
		//Binding parent properties
		this.handleClick = this.handleClick.bind(this);
		
	}
	
	handleClick(e) {
            e.preventDefault();

            // Grab the market from props
            const { market } = this.props;

            // Dispatch the action, passing the market to the action
            this.context.store.dispatch(setMarket({
                market
            }));
        }
	
	
	
	render() {
		
		const {market, reducer} = this.props;
		
		let cssClasses = 'list-group-item market';
		
		if (market.id === reducer.market.id) {
                cssClasses += ' active';
        }
				
		return (
                <a href="#" className={ cssClasses } onClick={ this.handleClick }>{ market.name }</a>
        );
	}
	
}

Market.propTypes = {
	market: React.PropTypes.object.isRequired
};

Market.contextTypes = {
	store: React.PropTypes.object
};

function mapStateToProps(state) {
	return {
		reducer: state.marketReducer
	};
}

Market = connect(
	mapStateToProps
)(Market)

export default Market;