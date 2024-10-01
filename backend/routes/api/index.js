// backend/route/api/index.js

const router = require('express').Router();
const { restoreUser } = require('../../utils/auth.js');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const workoutRouter = require('./workout.js');



router.get('/hello/world', (req, res) => {
    console.log("=== HERE I AM 2 ===")
    res.send('api/routes ---> Hello World!');
});

//You can use requireAuth as middleware for routes that require sign in
//You can use setTokenCookie as a func to set cookie for user

router.use(restoreUser);

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/workouts', workoutRouter);



module.exports = router;
