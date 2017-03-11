'use strict';

const defaultState ={
	market: {}
};

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        
		case 'SET_MARKET': {
			return {
					...state,
					market: action.payload.market
				};
		}
		
		default: {
            return state;
        }
    }
}

export default reducer;