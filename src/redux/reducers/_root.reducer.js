import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import getSearchResults from './getSearchResults.reducer';
import favoritesReducer from './favorites.reducer';
import pantryReducer from './pantry.reducer';
import groceryReducer from './grocery.reducer';
import categoryReducer from './category.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  getSearchResults, // contains search results from edamam api
  favoritesReducer, // contains the favorite recipes of the user
  pantryReducer, // contains user's pantry
  groceryReducer, // contains user's list of groceries
  categoryReducer, // contains the categories for the grocery list
});

export default rootReducer;
