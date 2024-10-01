// backend/routes/api/workout.js

const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { properUserValidation } = require('../../utils/validation');


const router = express.Router();


router.get('/hello/world', (req, res) => {
    console.log("=== HERE I AM 3 ===")
    res.send('api/routes/workouts ---> Hello World!');
});

router.get('/', async (req, res) => {
    console.log("=== HERE I AM 4 ===")
    res.send('api/routes/workout ---> Hello World!');
})

module.exports = router;