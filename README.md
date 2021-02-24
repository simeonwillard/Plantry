
# Plantry
This version uses React, Redux, Express, Passport, Material-UI, Edamam API, sweetalert2 and PostgreSQL (a full list of dependencies can be found in `package.json`).

## Description

Duration: 2 week sprint

I built Plantry to help people stop letting food go to waste in their pantry. Far too often we find moldy or expired food in our pantry or fridge that we then have to throw away.  Plantry seeks to eliminate that problem by giving users an easy view of their pantry as well as providing them with ideas of how to use that food. Plantry not only has your pantry, but it also acts as a grocery list, and a recipe search engine.  Users can search for recipes, view the ingredients for a recipe and Plantry will tell the user which ingredients the user already has in their pantry.  Now people can conveniently have their pantry, their grocery list, and their meal planner all in one app.

To see the fully functional site, please visit: https://gentle-springs-46141.herokuapp.com/#/home



## Prerequisites

Before you clone the app, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Installation

1. Create a new database called `plantry` and copy the database.sql file into your database
   The queries in the database.sql file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The    project is built on Postgres, so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create    the queries.
2. Open your editor of choice and add a .env file to the app.  You will need SERVER_SESSION_SECRET = yourRandomStringOfNumbersAndLettersOfYourChoice.
   You will also need an Edamam APP_ID and API_KEY from Edamam API.  You will need to make an account and get a `recipe search api key` from here:                  https://developer.edamam.com/edamam-recipe-api
3. Run `npm install` in your terminal
4. Run `npm run server` in the terminal
5. Run `npm run client` in a second terminal
6. The `npm run client` command will open up a new browser tab for you


## Usage

1.  A user logs in to the app with a registered name and password.
2.  The user then navigates to the pantry page, and inputs the food in their pantry (I plan on putting a barcode scanning function in so that you do not have to     manually input your pantry).
3.  The user wants to find some recipes to use the food that is in their pantry, so they navigate to the search pantry page, and start to search for recipes,         seeing what ingredients they have and what ingredients they need to buy.  
4.  The user likes some of the recipes, so they click the favorite icon on the recipes they liked.  They can now navigate to the favorites page to see their         favorite recipes.
5.  The user then wants to buy some groceries so that they can make the recipes for which they do not currently have the ingredients for, so they navigate to the     grocery list page.  
6.  The user fills up their grocery list to go shopping.
7.  The user goes shopping, and comes home to put all their groceries away in the pantry and fridge.  Then they open the app and mark all their items in their       grocery list as purchased, which puts the items right into their pantry!
8.  The user then cooks one of their favorited recipes, and after eating, delete the appropiate items from their pantry.


## Built With
- React.js
- Node.js
- Express.js
- Redux
- Redux-Saga
- PostgreSQL
- Material-UI
- sweetalert2
- Edamam API

## Acknowledgement
Thanks to Prime Digital Academy who equipped and helped me to make this application a reality.
Special thanks to Dane Smith, the Zhu cohort, and Justin Applegren

## Support
if you have suggestions or issues, please email me at simeonwillard19@gmail.com




