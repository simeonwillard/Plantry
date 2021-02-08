import axios from "axios";
import { takeEvery, put } from "redux-saga/effects";


function* fetchFavorites() {
    try {
        const response = yield axios.get('/api/favorites');
        yield put({type: 'SET_FAVORITES', payload: response.data});
    } catch (error) {
        console.log(`error fetching favorites ${error}`)
    }
}



function* favoritesSaga() {
    yield takeEvery('FETCH_FAVORITES', fetchFavorites);
}

export default favoritesSaga;