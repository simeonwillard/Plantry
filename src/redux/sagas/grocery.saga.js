import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";





function* fetchGroceryList() {
    try {
        const response = yield axios.get('/api/grocery');
        yield put({ type: 'SET_GROCERY_LIST', payload: response.data });
    } catch (error) {
        console.log('error getting grocery list', error);
    }
}


function* purchaseItem(action) {
    try {
        const itemPurchased = action.payload;
        console.log(itemPurchased, '**************')
        yield axios.put(`/api/grocery/${itemPurchased.id}`, { itemPurchased });
        yield put({ type: 'FETCH_GROCERY_LIST' });
    } catch (error) {
        console.log('error marking item as purchased', error);
    }
}

function* addItemToPantry(action) {
    try {
        const itemToAdd = action.payload;
        yield axios.post('api/pantry/from-grocery', { itemToAdd });
    } catch (error) {
        console.log('error adding grocery item to the pantry', error);
    }
}

function* deleteGroceryItem(action) {
    try {
        const itemToDelete = action.payload;
        yield axios.delete(`/api/grocery/${itemToDelete.id}`);
        yield put({ type: 'FETCH_GROCERY_LIST' });
    } catch (error) {
        console.log('error deleting grocery item', error);
    }
}


function* grocerySaga() {
    yield takeEvery('FETCH_GROCERY_LIST', fetchGroceryList);
    yield takeEvery('ITEM_PURCHASED', purchaseItem);
    yield takeEvery('ADD_ITEM_TO_PANTRY', addItemToPantry);
    yield takeEvery('DELETE_GROCERY_ITEM', deleteGroceryItem);
}

export default grocerySaga;