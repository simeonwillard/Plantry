
// reducer to store search results from edamam api
const getSearchResults = (state = [], action) => {
    switch (action.type) {
        case 'SET_SEARCH_RESULTS':
            return action.payload;

        default:
            return state;
    }
}

export default getSearchResults;