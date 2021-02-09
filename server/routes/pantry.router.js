const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// get the user's pantry
router.get('/', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM "pantry" WHERE "user_id" = $1;`;

    pool.query(queryText, [req.user.id])
    .then((response) => {
        res.send(response.rows);
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

module.exports = router;
