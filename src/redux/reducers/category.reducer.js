const categoryReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_GROCERY_CATEGORIES':
            return action.payload;
        
        default: 
            return state;
    }
}

export default categoryReducer;