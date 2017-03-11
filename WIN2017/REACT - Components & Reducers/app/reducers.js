import { combineReducers } from 'redux';

//Imports reducers
import marketsReducer from './components/markets/reducer';
import marketReducer from './components/markets/market/reducer';
import detailsReducer from './components/details/reducer';

const reducers = combineReducers({
	marketsReducer,
	marketReducer,
	detailsReducer
});

export default reducers;