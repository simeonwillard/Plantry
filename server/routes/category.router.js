const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();


// get route to store grocery categories in redux
router.get('/', rejectUnauthenticated, (req, res) => {
  
    const queryText = `SELECT * FROM "grocery_category";`;

    pool.query(queryText)
    .then((result) => {
        res.send(result.rows);
    })
    .catch((error) => {
        console.log('error getting grocery categories', error);
        res.sendStatus(500);
    })
});



module.exports = router;
