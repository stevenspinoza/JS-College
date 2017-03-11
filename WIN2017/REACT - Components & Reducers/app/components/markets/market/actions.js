'use strict';

/**
 * The action for the "SET_MARKET" event
 * Actions must always return an object, with two properties
 * 1. type - The name of the event to dispatch
 * 2. payload - The new data for the states for the reducers
 * Any logic for manipulating data ideally goes here, and not in your reducer
 */
const setMarket = (payload) => {
    return {
        type: 'SET_MARKET',
        payload
    };
};

export {
    setMarket
};