// backend/routes/api/workout.js

const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { properUserValidation, handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const { Op } = require('sequelize')
const { User, DayLog, Food, FoodIcon, FoodImage, Workout, WorkoutIcon, WorkoutImage } = require('../../db/models');


const router = express.Router();


router.get('/hello/world', (req, res) => {
    res.send('api/routes/workouts ---> Hello World!');
});

router.get('/', async (req, res, next) => {
    // console.log('\n\nentered get route!!!\n\n')

    try {
        const workouts = await Workout.findAll({
            include: [
                { 
                    model: User,
                    attributes: {
                        exclude: ['id', 'hashedPassword', 'updatedAt']
                    } 
                },
                { 
                    model: WorkoutIcon,
                }
            ],
            attributes: {
                exclude: ['userId']
            }
        });

        const answer = workouts.map(e=>{
            const workoutJSON = e.toJSON();
            console.log('\n--> e = ', workoutJSON)
            return workoutJSON
        })
        // res.send('entered TRY-Block')       
        res.json({Workouts: answer})
    } catch (e) {
        console.log('Route Error: ', e)
        next(e)
    }
});


module.exports = router;