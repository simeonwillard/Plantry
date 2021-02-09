import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";



function* fetchPantry() {
    try {
        const response = yield axios.get('/api/pantry');
        yield put({ type: 'SET_PANTRY', payload: response.data });
    } catch (error) {
        console.log('error in getting pantry', error);
    }
}

// function* editPantry(action) {
//     try {
//         const itemID = action.payload.id;
//         yield axios.put(`/api/pantry/${itemID}`);
//     } catch (error) {
        
//     }
// }



function* pantrySaga() {
    yield takeEvery('FETCH_PANTRY', fetchPantry);
    // yield takeEvery('EDIT_PANTRY', editPantry);
}

export default pantrySaga;