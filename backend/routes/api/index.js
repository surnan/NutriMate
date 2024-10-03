// backend/route/api/index.js

const router = require('express').Router();
const { restoreUser } = require('../../utils/auth.js');
const daylogsRouter = require('./daylogs.js')
const grubRouter = require('./grubs.js')
const grubiconsRouter = require('./grubicons.js')
const grubimagesRouter = require('./grubimages.js')
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const workouticonsRouter = require('./workoutIcons.js');
const workoutimagesRouter = require('./workoutImages.js');
const workoutsRouter = require('./workouts.js');




router.get('/hello/world', (req, res) => {
    console.log("=== HERE I AM 2 ===")
    res.send('api/routes ---> Hello World!');
});

//You can use requireAuth as middleware for routes that require sign in
//You can use setTokenCookie as a func to set cookie for user

router.use(restoreUser);

router.use('/daylogs', daylogsRouter);
router.use('/grubs', grubRouter);
router.use('/grubicons', grubiconsRouter);
router.use('/grubimages', grubimagesRouter);
router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/workouticons', workouticonsRouter);
router.use('/workoutimages', workoutimagesRouter);                                                                                                                                                                                            
router.use('/workouts', workoutsRouter);
module.exports = router;
