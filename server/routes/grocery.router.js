const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// route to get the grocery list from db
router.get('/', rejectUnauthenticated, (req, res) => {
    
    // SELECT pertinent grocery_list info, the category names for the items, and the username of the
    // current user all WHERE the user_id = the logged in user
    const queryText = `
                    SELECT  "grocery_list".id, "grocery_list".name,"grocery_list".quantity, "grocery_list".unit, 
                            "grocery_list".purchased, "user".username, "grocery_category".name as "category" 
                    FROM "grocery_list" 
                    JOIN "grocery_category" ON "grocery_category".id = "grocery_list".category_id
                    JOIN "user" ON "user".id = "grocery_list".user_id
                    WHERE "grocery_list".user_id = $1;
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

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});


// put route to update an item as purchased
router.put('/:id', rejectUnauthenticated, (req, res) => {

    const itemToPurchase = req.body.itemPurchased;

    const queryText = `
                        UPDATE "grocery_list" 
                        SET "purchased" = TRUE 
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

module.exports = router;
