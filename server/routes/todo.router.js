const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET
router.get ('/', (req, res)=> {
   console.log('/api/todo GET hit');
   const queryString = 'SELECT * from todo; '; 
   pool.query ( queryString ).then ( ( results ) => {
    res.send( results.rows ); 
   }).catch ( ( err ) => {
    console.log ( err); 
    res.sendStatus ( 400); 
   })
})



// POST

// PUT

// DELETE

module.exports = router;

