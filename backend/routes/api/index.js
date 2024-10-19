// backend/route/api/index.js

const router = require('express').Router();
const { restoreUser } = require('../../utils/auth.js');
// const { requireAuth } = require("../../utils/auth.js");
const daylogsRouter = require('./daylogs.js')
const grubRouter = require('./grubs.js')
const grubimagesRouter = require('./grubimages.js')
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const weightsRouter = require('./weights.js');
const workoutimagesRouter = require('./workoutImages.js');
const workoutsRouter = require('./workouts.js');


router.get('/hello/world', (req, res) => {
    res.send('api/routes ---> Hello World! password -2');
});

//requireAuth as middleware for routes that require sign in
router.use(restoreUser);

// Restore user
router.get('/restore-user', (req, res) => {
    console.log("inside restore-user")
    return res.json(req.user);
});


router.use('/daylogs', daylogsRouter);
router.use('/grubs', grubRouter);
router.use('/grubimages', grubimagesRouter);
router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/weights', weightsRouter);
router.use('/workoutimages', workoutimagesRouter);                                                                                                                                                                                            
router.use('/workouts', workoutsRouter);
module.exports = router;
