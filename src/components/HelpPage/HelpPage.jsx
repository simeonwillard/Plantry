import React from 'react';
import './HelpPage.css';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {
  return (
    <div className="container">
      <div className="helpOverview">
        <h1>Help Page</h1>
        <div>
          <h3>Search Recipes Page</h3>
          <p >On this page you have the ability to search for recipes using the search input.
          When you search for a recipe, recipes will populate the page and you will see information about
          each recipe.</p>
          <ul>
            <li>
              The "GO TO RECIPE" button will take you to that recipe's source website where you can
              view that recipe.
          </li>
            <li>
              Each recipe card will tell you the calories, the source website, and the servings of that recipe.
          </li>
            <li>
              The "heart" icon will allow you to favorite that recipe, which will store the recipe in your "Favorites" page.
          </li>
            <li>
              The "details" dropdown, when clicked, will show the ingredients for that recipe.  If an ingredient has a blue "check" icon next
              to it, that means that you have that ingredient in your pantry.
          </li>
          </ul>

        </div>
        <br/>
        <div>
          <h3>Favorites Page</h3>
          <p>This page stores all of your favorite recipes</p>
          <ul>
            <li>The recipes have the same features as the "Search Recipes" page.</li>
            <li>The "trashcan" icon will remove the recipe from your favorites.</li>
          </ul>
          <br/>
          <div>
            <h3>Pantry Page</h3>
            <p>This page contains your pantry data</p>
            <ul>
              <li>The "plus" icon in the top right allows you to add an item to the table, each field must be filled out.</li>
              <li>
                The black "clear" button when clicked will give the user an option to delete all the data in the table, or to 
                delete all of the data that is not marked as a "staple".
              </li>
              <li>
                The "pencil" icons in the table allows you to make edits to that data row in the table, a form will appear at the 
                top of the table.
              </li>
              <li>
                The "trashcan" icons in the table allow you to delete that row from the table.
              </li>
            </ul>
            <br/>
            <div>
              <h3>Grocery List Page</h3>
              <p>This page allows the user to make a grocery list.  The grocery list items are color coded based on their 
                respective category
              </p>
              <ul>
                <li>The "plus" icon at the top right of the page allows you to add an item to the list, all fields must be filled.</li>
                <li>The black "clear" button will delete the entire grocery list.</li>
                <li>The "pencil" icon on each item allows the user to edit that item</li>
                <li>The "trashcan" icon will delete that item from your list</li>
                <li>The "check" icon will mark that item as "purchased" and will immediately add that item to your pantry.</li>
                <li>When an item is marked as "purchased" an "undo" icon will appear on the item, if clicked the item will no longer
                  be marked as "purchased", and the item will be removed from your pantry.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoPage;
