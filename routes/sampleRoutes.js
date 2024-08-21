const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/sample:
 *  get:
 *      summary: Get a list of samples
 *      description: Retrieve a list of sample items.
 *      responses:
 *          200:
 *              description: A list of samples.
 */
router.get("/sample", (req, res)=>{
    // Your GET method logic here
    res.send("GET method - list of sample");
})

module.exports = router;