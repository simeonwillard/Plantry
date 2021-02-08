const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// get favorites from db
router.get('/', rejectUnauthenticated, (req, res) => {
    // selecting favorite_recipes of the specific user
    const queryText = `SELECT * FROM "favorite_recipes" WHERE "user_id" = $1;`;

    pool.query(queryText, [req.user.id])
        .then((response) => {
            console.log('current user: ', req.user);
            res.send(response.rows);
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

    // inserting into favorite_recipes table in db
    const queryText = `INSERT INTO "favorite_recipes" ("title", "image", "url", "ingredients", "user_id")
                        VALUES ($1, $2, $3, $4, $5);`;

    pool.query(queryText, [newFavorite.title, newFavorite.image, newFavorite.url, newFavorite.ingredients, req.user.id])
    .then((response) => {
        res.sendStatus(200);
    })
    .catch((error) => {
        console.log(`error in adding favorite ${error}`);
        res.sendStatus(500);
    })
});

module.exports = router;
