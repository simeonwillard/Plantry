import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <h2 className="welcome">{heading}</h2>

      <div className="grid">
        <div className="grid-col grid-col_8">
          <p className="welcome">Plantry is an app to help you not let food go to waste in your pantry.  Plantry keeps your pantry, your
          favorite recipes, and your grocery list all in one place to make meal planning and grocery trips more convenient.  With Plantry 
          meal planning is made easy with the ability to search recipes from the app, as well as the ability to see if you have the 
          right ingredients in your pantry for each recipe</p>
        </div>
        <div className="grid-col grid-col_4">
          <RegisterForm />

          <center>
            <h4>Already a Member?</h4>
            <button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
