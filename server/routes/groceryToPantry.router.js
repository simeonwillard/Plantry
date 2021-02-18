const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


// route to delete new purchased item from pantry upon user clicking "undo"
router.put('/', rejectUnauthenticated, (req, res) => {

    const queryText = `DELETE FROM "pantry" WHERE "category_id" = $1 AND "item" = $2 AND "user_id" = $3;`;

    const itemToRemove = req.body.itemToDelete;
    console.log(itemToRemove);

    pool.query(queryText, [itemToRemove.category_id, itemToRemove.name, req.user.id])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('error removing purchased item from pantry', error);
            res.sendStatus(500);
        })
})

// route to add purchased grocery item to pantry
router.post('/', rejectUnauthenticated, (req, res) => {

    const itemToAdd = req.body.itemToAdd;
    console.log(itemToAdd)

    const queryText = `
                        INSERT INTO "pantry" ("item", "quantity", "unit", "category_id", "user_id")
                        VALUES ($1, $2, $3, $4, $5);
                        `;

    pool.query(queryText, [itemToAdd.name, itemToAdd.quantity, itemToAdd.unit, itemToAdd.category_id, req.user.id])
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log('error adding grocery item to pantry', error);
            res.sendStatus(500);
        })
})



module.exports = router;
