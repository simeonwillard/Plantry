const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// get favorites from db
router.get('/', rejectUnauthenticated, (req, res) => {
    // GET 
    const queryText = `SELECT "favorite_recipes" WHERE "user_id" = $1;`;

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

/**
 * POST route template
 */
router.post('/', (req, res) => {
    // POST route code here
});

module.exports = router;
