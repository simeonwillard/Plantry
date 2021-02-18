const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// get the user's pantry
router.get('/', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT "pantry".*, "grocery_category".name AS "category" FROM "pantry"
    JOIN "grocery_category" ON "grocery_category".id = "pantry".category_id
    WHERE "pantry".user_id = $1
    ORDER BY "category";`;

    pool.query(queryText, [req.user.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('error getting pantry', error);
            res.sendStatus(500);
        })
});


// post route to add an item to the pantry table
router.post('/', rejectUnauthenticated, (req, res) => {
    const itemToAdd = req.body.newItem;

    const queryText = `
    INSERT INTO "pantry" ("item", "quantity", "unit", "category_id", "staple", "date_purchased", "user_id")
    VALUES ($1, $2, $3, $4, $5, $6, $7);
    `;

    pool.query(queryText, [itemToAdd.item, itemToAdd.quantity, itemToAdd.unit, itemToAdd.category_id,
    itemToAdd.staple, itemToAdd.date_purchased, req.user.id])
        .then((result) => {
            res.sendStatus(201)
        })
        .catch((error) => {
            console.log('error in adding item to pantry', error);
            res.sendStatus(500);
        })
});


// put to update a row in the pantry for edit feature
router.put('/:id', rejectUnauthenticated, (req, res) => {
    let itemToEdit = req.body.editItem;
    console.log(itemToEdit);

    const queryText = `
    UPDATE "pantry" SET "item" = $1, "quantity" = $2, "unit" = $3, "category_id" = $4, "staple" = $5, "date_purchased" = $6
    WHERE "id" = $7 AND "user_id" = $8;`;

    pool.query(queryText, [itemToEdit.item, itemToEdit.quantity, itemToEdit.unit, itemToEdit.category_id, itemToEdit.staple,
    itemToEdit.date_purchased, itemToEdit.id, req.user.id])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('error in updating edited item', error);
            res.sendStatus(500);
        })
})



// delete route to delete a single row in the pantry table
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    let itemToDelete = req.params.id;

    const queryText = `DELETE FROM "pantry" WHERE "id" = $1 AND "user_id" = $2;`;

    pool.query(queryText, [itemToDelete, req.user.id])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('error in deleting item from pantry', error);
            res.sendStatus(500);
        })
})

router.delete('/', rejectUnauthenticated, (req, res) => {

    const queryText = `DELETE FROM "pantry" WHERE "staple" = false AND "user_id" = $1;`;

    pool.query(queryText, [req.user.id])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('error clearing pantry', error);
            res.sendStatus(500);
        })
})




module.exports = router;
