'use strict';

const defaultState ={
	markets: [
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
	]
};

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        default: {
            return state;
        }
    }
}

export default reducer