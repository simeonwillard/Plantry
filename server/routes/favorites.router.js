const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

// get favorites from db
router.get('/', rejectUnauthenticated, (req, res) => {
    // selecting favorite_recipes of the specific user
    const queryText = `SELECT * FROM "favorite_recipes" WHERE "user_id" = $1;`;

    // variable to store favorites from database
    let favoriteRecipes = [];

    pool.query(queryText, [req.user.id])
        .then((result) => {

            favoriteRecipes.push(result.rows);

            // looping over favorites to search edamam API for recipes
            for (let recipe of favoriteRecipes[0]) {
                // encoding recipe URI for edamam API
                // console.log(recipe.recipe);
                let id = encodeURIComponent(recipe.recipe);
                let response = [];
                // console.log(id)
                // searching edamam API for results
            
                axios.get(`https://api.edamam.com/search?app_id=${process.env.APP_ID}&app_key=${process.env.API_KEY}&r=${id}`)
                    .then((result) => {
                        // console.log('got the recipes');
                        // console.log(result.data)
                        // sending search results back to user
                        // return res.send(result.data);
                        
                    })
                    // .catch(error => {
                    //     console.log(`error getting favorite recipes ${error}`);
                    //     res.sendStatus(500);
                    // })
            }
            
        })
        .catch((error) => {
            console.log(`error getting favorites ${error}`);
            res.sendStatus(500);
        });



});


// adding a favorite recipe
router.post('/', rejectUnauthenticated, (req, res) => {

    const newFavorite = req.body.newFavorite;

    // inserting into favorite_recipes table in db
    const queryText = `INSERT INTO "favorite_recipes" ("recipe", "user_id")
                        VALUES ($1, $2);`;

    pool.query(queryText, [newFavorite.uri, req.user.id])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log(`error in adding favorite ${error}`);
            res.sendStatus(500);
        })
});

// deleting a favorite recipe
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    const queryText = `DELETE FROM "favorite_recipes" WHERE "id" = $1 AND "user_id" = $2;`;

    pool.query(queryText, [req.params.id, req.user.id])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log(`error in deleting favorite ${error}`);
            res.sendStatus(500);
        })
})

module.exports = router;


