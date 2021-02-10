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

function* editPantry(action) {
    try {
        const editItem = action.payload;
        console.log('action.payload ************', action.payload);
        yield axios.put(`/api/pantry/${editItem.id}`, { editItem });
        yield put({ type: 'FETCH_PANTRY' });
    } catch (error) {
        console.log('error editing item', error);
    }
}

function* deletePantryItem(action) {
    try {
        console.log('deleting pantry item');
        const itemToDelete = action.payload.id;
        yield axios.delete(`/api/pantry/${itemToDelete}`);
        yield put({ type: 'FETCH_PANTRY' })
    } catch (error) {
        console.log('error in deleting item from pantry', error);
    }
}

function* addPantryItem(action) {
    try {
        const newItem = action.payload;
        yield axios.post('/api/pantry', { newItem });
        yield put({ type: 'FETCH_PANTRY' });
    } catch (error) {
        console.log('error adding item to pantry', error);
    }
}

function* deletePantry() {
    try {
        yield axios.delete('/api/pantry');
        yield put({ type: 'FETCH_PANTRY' });
    } catch (error) {
        console.log('error deleting entire pantry', error);
    }
}

function* pantrySaga() {
    yield takeEvery('FETCH_PANTRY', fetchPantry);
    yield takeEvery('EDIT_PANTRY', editPantry);
    yield takeEvery('ADD_PANTRY_ITEM', addPantryItem)
    yield takeEvery('DELETE_PANTRY_ITEM', deletePantryItem);
    yield takeEvery('DELETE_PANTRY', deletePantry);
}

export default pantrySaga;