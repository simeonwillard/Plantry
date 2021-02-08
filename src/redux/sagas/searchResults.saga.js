import axios from 'axios';
import { func } from 'prop-types';
import {put, takeEvery} from 'redux-saga/effects';

// saga to get search results from edamam api and send the results to 
// getSearchResults reducer
function* fetchEdamamSearch(action) {
    try {
        // user's query
        const query = action.payload;
        console.log('users query is:', query)
        console.log('fetching searched recipes');
        // sending query to server
        const response = yield axios.get(`/api/edamam?q=${query}`);
        // dispatching server response to getSearchResults reducer
        yield put({type: 'SET_SEARCH_RESULTS', payload: response.data})
    } catch (error) {
        console.log(`error fetching search results ${error}`);
    }
}

function* searchResults() {
    yield takeEvery('FETCH_SEARCH_RESULTS', fetchEdamamSearch);
}

export default searchResults;