import React from 'react';
import './About.css';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <h1 className="header">Plantry</h1>
      <div>
        <p className="about">Welcome to Plantry!  This app was built to help people cut down on their food waste and to 
          help grocery shopping and meal planning be easier!  Users are able to fill out a table with the contents of their 
          pantry.  From their they are able to search for recipes to use that food in their pantry.  By making the ingredients for each 
          recipe conveniently visible, users are then able to make a grocery list to update their pantry so that they can 
          make that recipe.  Plantry automatically tells the user which ingredients they have in their pantry when viewing the 
          ingredients for a recipe. <br/><br/>Register an account today! Happy Planning!</p>
      </div>
    </div>
  );
}

export default AboutPage;
