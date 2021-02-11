import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";





function* fetchGroceryList() {
    try {
        const response = yield axios.get('/api/grocery');
        yield put({type: 'SET_GROCERY_LIST', payload: response.data});
    } catch (error) {
        console.log('error getting grocery list', error);
    }
}





function* grocerySaga() {
    yield takeEvery('FETCH_GROCERY_LIST', fetchGroceryList);
}

export default grocerySaga;