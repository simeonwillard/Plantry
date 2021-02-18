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
        // console.log('adding recipe to favorites: ', newFavorite);
        yield axios.post('/api/favorites', { newFavorite });
        yield put({ type: 'FETCH_FAVORITES' });
    } catch (error) {
        console.log('error adding recipe to favorites', error);
    }
}

// saga to delete a recipe from favorites
function* deleteFavorite(action) {
    try {
        console.log('removing favorite');
        const favoriteID = action.payload.id;
        console.log(favoriteID);

        yield axios.delete(`/api/favorites/${favoriteID}`);
        yield put({ type: 'FETCH_FAVORITES' })
    } catch (error) {
        console.log('error in deleting favorite', error);
    }
}

function* setInPantry(action) {
    try {
        yield axios.put(`/api/favorites/${action.payload.id}`, {in_pantry: action.payload.in_pantry});
        // yield put({type: 'FETCH_FAVORITES'});
    } catch (error) {
        console.log('error changing inpantry value', error);
    }
}

function* favoritesSaga() {
    yield takeEvery('FETCH_FAVORITES', fetchFavorites);
    yield takeEvery('ADD_FAVORITE', addFavorite);
    yield takeEvery('DELETE_FAVORITE', deleteFavorite);
    yield takeEvery('SET_IN_PANTRY', setInPantry);
}

export default favoritesSaga;