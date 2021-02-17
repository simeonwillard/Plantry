const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


// route to delete new purchased item from pantry upon user clicking "undo"
router.put('/', rejectUnauthenticated, (req, res) => {

    const queryText = `DELETE FROM "pantry" WHERE "cabinet" = 'just purchased' AND "item" = $1 AND "user_id" = $2;`;

    const itemToRemove = req.body.itemToDelete;
    console.log(itemToRemove);

    pool.query(queryText, [itemToRemove.name, req.user.id])
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

    let refrigerated = true;

    switch (itemToAdd.category) {
        case 'baking':
        case 'canned':
        case 'misc.':
            refrigerated = false;
            break;

        default:
            true;
    }

    const queryText = `
                        INSERT INTO "pantry" ("item", "staple", "refrigerated", "user_id")
                        VALUES ($1, $2, $3, $4);
                        `;

    pool.query(queryText, [itemToAdd.name, false, refrigerated, req.user.id])
    .then((result) => {
        res.sendStatus(201);
    })
    .catch((error) => {
        console.log('error adding grocery item to pantry', error);
        res.sendStatus(500);
    })
})



module.exports = router;
