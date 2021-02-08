import axios from "axios";
import { takeEvery, put } from "redux-saga/effects";

// saga to get the favorite recipes of the user
function* fetchFavorites() {
    try {
        const response = yield axios.get('/api/favorites');
        yield put({ type: 'SET_FAVORITES', payload: response.data });
    } catch (error) {
        console.log(`error fetching favorites ${error}`)
    }
}

// saga to add a recipe to favorites 
function* addFavorite(action) {
    try {
        const newFavorite = action.payload;
        console.log('adding recipe to favorites: ', newFavorite);
        yield axios.post('/api/favorites', { newFavorite });
        yield put({ type: 'FETCH_FAVORITES' });
    } catch (error) {
        console.log('error adding recipe to favorites', error);
    }
}


function* favoritesSaga() {
    yield takeEvery('FETCH_FAVORITES', fetchFavorites);
    yield takeEvery('ADD_FAVORITE', addFavorite);
}

export default favoritesSaga;