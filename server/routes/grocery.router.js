const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// route to get the grocery list from db
router.get('/', rejectUnauthenticated, (req, res) => {
    
    const queryText = `SELECT * FROM "grocery_list" WHERE "user_id" = $1 ORDER BY "id";`;

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

module.exports = router;
