// backend/routes/api/workout.js

const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { properUserValidation } = require('../../utils/validation');


const router = express.Router();


router.get('/hello/world', (req, res) => {
    res.send('api/routes/workouts ---> Hello World!');
});


module.exports = router;