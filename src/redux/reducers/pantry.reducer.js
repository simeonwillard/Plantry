const pantryReducer = (state= [], action) => {
    switch (action.type) {
        case 'SET_PANTRY':
            return action.payload;

        default:
            return state;
    }
}

export default pantryReducer;