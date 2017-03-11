'use strict';

import React from 'react';
import Header from '../header';
import Markets from '../markets';
//Details added
import Details from '../details';

export default class Index extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
		<div className="container">
            <Header/>
			<div className="row">
				<div className="col-xs-4">
				{}
				<Markets/>
				</div>
				<div className="col-xs-4 detail">
					<Details/>
				</div>
			</div>
		</div>
			/* <div className="container">
                <p>Index Component</p>
            </div> */
        );
    }
}