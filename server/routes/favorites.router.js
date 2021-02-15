const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// get favorites from db
router.get('/', rejectUnauthenticated, (req, res) => {
    // selecting favorite_recipes of the specific user
    const queryText = `SELECT * FROM "favorite_recipes" WHERE "user_id" = $1;`;

    pool.query(queryText, [req.user.id])
        .then((result) => {
            console.log('current user: ', req.user);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`error getting favorites ${error}`);
            res.sendStatus(500);
        })
});


// adding a favorite recipe
router.post('/', rejectUnauthenticated, (req, res) => {
    console.log('in POST with user: ', req.user);
    const newFavorite = req.body.newFavorite;
    // console.log(newFavorite)

    let ingredients = newFavorite.ingredients;
    console.log(ingredients)
    
    let newArray = [];
    for (let i = 1; i < ingredients.length; i++) {
            
            newArray.push(ingredients[i].text);
            console.log('newArray is: ', newArray);
    }

    // inserting into favorite_recipes table in db
    const queryText = `INSERT INTO "favorite_recipes" ("title", "image", "url", "ingredients", "user_id")
                        VALUES ($1, $2, $3, $4, $5);`;

    pool.query(queryText, [newFavorite.label, newFavorite.image, newFavorite.url, newArray, req.user.id])
    .then((result) => {
        res.sendStatus(200);
    })
    .catch((error) => {
        console.log(`error in adding favorite ${error}`);
        res.sendStatus(500);
    })
});

// deleting a favorite recipe
router.delete('/:id',  rejectUnauthenticated, (req, res) => {
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


