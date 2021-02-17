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

function* fetchCategories() {
    try {
        const response = yield axios.get('/api/category');
        yield put({ type: 'SET_GROCERY_CATEGORIES', payload: response.data })
    } catch (error) {
        console.log('error getting grocery categories', error);
    }
}

function* editGrocery(action) {
    try {
        const editItem = action.payload;
        console.log(editItem);
        yield axios.put(`/api/grocery/item/${editItem.id}`, { editItem });
        yield put({ type: 'FETCH_GROCERY_LIST' });
    } catch (error) {
        console.log('error editing item on the grocery list', error);
    }
}


function* clearGroceryList() {
    try {
        yield axios.delete('/api/grocery');
        yield put({ type: 'FETCH_GROCERY_LIST' });
    } catch (error) {
        console.log('error clearing the grocery list', error);
    }
}


function* addToGrocery(action) {
    try {
        const itemToAdd = action.payload;
        yield axios.post('/api/grocery', { itemToAdd });
        yield put({ type: 'FETCH_GROCERY_LIST' })
    } catch (error) {
        console.log('error adding item to grocery list', error);
    }
}

function* deletePantryPurchase(action) {
    try {
        const itemToDelete = action.payload;
        yield axios.delete('/api/pantry/purchase', { itemToDelete });
    } catch (error) {
        console.log('error deleting purchase from pantry', error);
    }

}

function* grocerySaga() {
    yield takeEvery('FETCH_GROCERY_LIST', fetchGroceryList);
    yield takeEvery('ITEM_PURCHASED', purchaseItem);
    yield takeEvery('ADD_ITEM_TO_PANTRY', addItemToPantry);
    yield takeEvery('DELETE_GROCERY_ITEM', deleteGroceryItem);
    yield takeEvery('FETCH_GROCERY_CATEGORIES', fetchCategories);
    yield takeEvery('EDIT_GROCERY_LIST', editGrocery);
    yield takeEvery('CLEAR_GROCERY_LIST', clearGroceryList);
    yield takeEvery('ADD_TO_GROCERY', addToGrocery);
    yield takeEvery('DELETE_PANTRY_PURCHASE', deletePantryPurchase);
}

export default grocerySaga;