'use strict';

import React from 'react';
import Provider from './provider';

export default class Fruit extends React.Component {
	
	constructor() {
		super();
		
		/* this.provider = [
			{
				id: 1,
				name: 'The Red House',
				phone_number: '519 555 5555'
			},
			{
				id: 2,
				name: 'The Green House',
				phone_number: '507 555 5555'
			},
			{
				id: 3,
				name: 'The White House',
				phone_number: '1 800 555 5555'
			}
		]; */
		
	}
	
	render() {
		
		const {fruit} = this.props;
		
				
		return (
		<div>
			<div href="#" className="list-group-item fruit">{ fruit.name } - we have it!
			<Provider/>
			</div>			
		</div>
		);
	}
	
}