const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// get the user's pantry
router.get('/', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM "pantry" WHERE "user_id" = $1;`;

    pool.query(queryText, [req.user.id])
    .then((result) => {
        res.send(result.rows);
    })
    .catch((error) => {
        console.log('error getting pantry', error);
        res.sendStatus(500);
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});


// put to update a row in the pantry for edit feature
router.put('/:id', rejectUnauthenticated, (req, res) => {
    let itemToEdit = req.body.editItem;
    console.log(itemToEdit);

    const queryText = `
    UPDATE "pantry" SET "item" = $1, "staple" = $2, "refrigerated" = $3, "date_purchased" = $4
    WHERE "id" = $5;`;

    pool.query(queryText, [itemToEdit.item, itemToEdit.staple, itemToEdit.refrigerated, 
                            itemToEdit.date_purchased, itemToEdit.id])
    .then((result) => {
        res.sendStatus(200);
    })
    .catch((error) => {
        console.log('error in updating edited item', error);
        res.sendStatus(500);
    })
})

module.exports = router;
