const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

// get route for searching the recipes from edamam api
router.get('/', (req, res) => {
    // GET route code here
    // query input from user
    const query = req.query.q;
    // console.log(query);

    // getting results from edamam api
    axios.get(`https://api.edamam.com/search?q=${query}&app_id=${process.env.APP_ID}&app_key=${process.env.API_KEY}`)
    .then(result => {
        console.log('got the recipes');
        // sending search results back to user
        res.send(result.data.hits);
    })
    .catch(error => {
        console.log(`error searching for recipes ${error}`);
        res.sendStatus(500);
    })
})




    module.exports = router;
