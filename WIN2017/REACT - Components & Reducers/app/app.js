'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

//New Redux libs
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';

//Import root component
import Index from './components/index';

// Import main reducer
import reducers from './reducers';

//Storing reducers and applyMiddleware
let store = createStore(reducers, applyMiddleware(createLogger()));


ReactDOM.render(
//Wrap root 
<Provider store={ store }>
	<Index/>
</Provider>, document.getElementById('app'));