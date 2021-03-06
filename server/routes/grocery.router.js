const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// route to get the grocery list from db
router.get('/', rejectUnauthenticated, (req, res) => {

    const queryText = `
                    SELECT "grocery_list".*, "grocery_category".name AS "category" FROM "grocery_list"
                    JOIN "grocery_category" ON "grocery_category".id = "grocery_list".category_id
                    WHERE "user_id" = $1
                    ORDER BY "category";
                    `;

    pool.query(queryText, [req.user.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('error getting grocery list', error);
            res.sendStatus(500);
        })
});


// post route to add an item to the grocery list
router.post('/', rejectUnauthenticated, (req, res) => {

    const itemToAdd = req.body.itemToAdd;

    const queryText = `
                        INSERT INTO "grocery_list" ("name", "quantity", "unit", "category_id", "user_id")
                        VALUES ($1, $2, $3, $4, $5);
                        `;

    pool.query(queryText, [itemToAdd.name, itemToAdd.quantity, itemToAdd.unit, itemToAdd.category_id, req.user.id])
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log('error adding item to grocery list', error);
            res.sendStatus(500);
        })
});


// put route to update an item as purchased
router.put('/:id', rejectUnauthenticated, (req, res) => {

    const itemToPurchase = req.body.itemPurchased;

    const queryText = `
                        UPDATE "grocery_list" 
                        SET "purchased" = NOT purchased 
                        WHERE "id" = $1 AND "user_id" = $2;
                        `;

    pool.query(queryText, [itemToPurchase.id, req.user.id])
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log('error purchasing item', error);
            res.sendStatus(500);
        })
})

// put route to update an item on the grocery list
router.put('/item/:id', rejectUnauthenticated, (req, res) => {
    let itemToEdit = req.body.editItem;
    console.log(itemToEdit);

    const queryText = `
                        UPDATE "grocery_list" 
                        SET ("name", "quantity", "unit", "category_id") = 
                            ($1, $2, $3, $4)
                        WHERE "id" = $5 AND "user_id" = $6;
    `;

    pool.query(queryText, [itemToEdit.name, itemToEdit.quantity, itemToEdit.unit,
    itemToEdit.category_id, itemToEdit.id, req.user.id])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('error in updating edited item', error);
            res.sendStatus(500);
        })
})

// delete route to delete a single grocery item
router.delete('/:id', rejectUnauthenticated, (req, res) => {

    const itemToDelete = req.params.id;

    const queryText = `DELETE FROM "grocery_list" WHERE "id" = $1 AND "user_id" = $2;`;

    pool.query(queryText, [itemToDelete, req.user.id])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('error deleting a grocery item', error);
            res.sendStatus(500);
        })
})


// delete route to clear grocery list
router.delete('/', rejectUnauthenticated, (req, res) => {

    const queryText = `DELETE FROM "grocery_list" WHERE "user_id" = $1;`;

    pool.query(queryText, [req.user.id])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('error clearing grocery list', error);
            res.sendStatus(500);
        })
})

module.exports = router;
