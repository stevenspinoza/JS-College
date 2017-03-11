'use strict';

const defaultState = {
    market: {}
};

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_MARKET': {
            return {
                market: {
                    id: action.payload.market.id
                }
            };
        }
        default: {
            return state;
        }
    }
}

export default reducer;