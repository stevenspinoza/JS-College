'use strict';

import React from 'react';
import { connect } from 'react-redux';
import Market from './market';

class Markets extends React.Component {
	
	constructor() {
		super();	
						
		/* this.fruits = [
			{
				id: 1,
				name: 'Red Apple'				
			},
			{
				id: 2,
				name: 'Green Apple'
			},
			{
				id: 3,
				name: 'Yellow Apple'
			}
		]; */
		
	}
	
	
	render() {
		const { reducer } = this.props;
		
				
		let listMarkets = reducer.markets.map((market) => {
			return <Market key={market.id} market={market}></Market>
		});
		
		return (
			<div className="list-group-item markets">
				Available Markets
				{}
				{listMarkets}
			</div>
		);
	}
	
}

//Specify that props come from the reducer
Markets.propTypes = {
    reducer: React.PropTypes.object.isRequired
};

//Set reducers as props
function mapStateToProps(state) {
    return {
        reducer: state.marketsReducer
    };
}

//Connects component to store
Markets = connect(
    mapStateToProps
)(Markets);

export default Markets;