const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

// get favorites from db
router.get('/', rejectUnauthenticated, (req, res) => {
    // selecting favorite_recipes of the specific user
    const queryText = `
                        SELECT "favorite_recipes".*, json_agg("ingredients".*) ingredients FROM "favorite_recipes"
                        JOIN "ingredients" ON "ingredients".recipe_id = "favorite_recipes".id
                        WHERE "favorite_recipes".user_id = $1
                        GROUP BY "favorite_recipes".id;`;

    pool.query(queryText, [req.user.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('error getting favorites', error);
        });
});


// adding a favorite recipe
router.post('/', rejectUnauthenticated, (req, res) => {

    const newFavorite = req.body.newFavorite;

    // inserting into favorite_recipes table in db
    const insertIntoFavoriteRecipes = `INSERT INTO "favorite_recipes" ("label", "image", "url", "source", "calories", "yield", "user_id")
                                       VALUES ($1, $2, $3, $4, $5, $6, $7)
                                       RETURNING "id";`;

    pool.query(insertIntoFavoriteRecipes, [newFavorite.label, newFavorite.image, newFavorite.url,
    newFavorite.source, newFavorite.calories, newFavorite.yield, req.user.id])
        .then((result) => {

            const createdRecipeId = result.rows[0].id;

            for (let ingredient of newFavorite.ingredientLines) {

                const insertIntoIngredientsQuery = `INSERT INTO "ingredients" ("name", "recipe_id")
                                                    VALUES ($1, $2);`;

                pool.query(insertIntoIngredientsQuery, [ingredient, createdRecipeId])
            }

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

router.put('/:id', rejectUnauthenticated, (req, res) => {

    const queryText = `UPDATE "ingredients" SET "in_pantry" = $1 WHERE "id" = $2;`;

    pool.query(queryText, [req.body.in_pantry, req.params.id])
    .then((result) => {
        res.sendStatus(200);
    })
    .catch((error) => {
        console.log('error updating ingredients', error);
        res.sendStatus(500);
    })
})

module.exports = router;


