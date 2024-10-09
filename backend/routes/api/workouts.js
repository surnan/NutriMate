// backend/routes/api/workout.js

const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { properUserValidation, handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const { Op } = require('sequelize')
const { User, DayLog, Food, FoodIcon, FoodImage, Workout, WorkoutIcon, WorkoutImage } = require('../../db/models');
const { response } = require('../../app');


const router = express.Router();


router.get('/hello/world', (req, res) => {
    res.send('api/routes/workouts ---> Hello World!');
});

//all 
router.get('/', async (req, res, next) => {
    try {
        const workouts = await Workout.findAll({
            include: [
                { 
                    model: User,
                    attributes: {
                        exclude: ['hashedPassword', 'updatedAt']
                    } 
                },
                { 
                    model: WorkoutIcon,
                },
                { 
                    model: WorkoutImage,
                }
            ]
        });

        const answer = workouts.map(e=>{
            const workoutJSON = e.toJSON();
            return workoutJSON
        })     
        res.json({Workouts: answer})
    } catch (e) {
        console.log('Route Error: ', e)
        next(e)
    }
});


//one
router.get('/:workoutId', async (req, res, next) => {
    try {
        const workoutId = parseInt(req.params.workoutId)
        const currentWorkout = await Workout.findByPk(workoutId, {
            include: [
                { 
                    model: User,
                    attributes: {
                        exclude: ['hashedPassword', 'updatedAt']
                    } 
                },
                { 
                    model: WorkoutIcon,
                },
                { 
                    model: WorkoutImage,
                }
            ]
        })

        if (!currentWorkout){
            res.status(404).json({
                message: "Workout couldn't be found"
            })
        }
        const currentWorkoutJSON = currentWorkout.toJSON()
        return res.status(201).json(currentWorkoutJSON)
    } catch (e){
        console.log('Route Error: ', e)
        next(e)
    }
});


router.delete('/:workoutId', async (req, res, next) => {
    try {
        const workoutId = parseInt(req.params.workoutId)
        const currentWorkout = await Workout.findByPk(workoutId)
        if (!currentWorkout){
            res.status(404).json({
                message: "Workout couldn't be found"
            })
        }
        currentWorkout.destroy();
        res.json({"message": "Successfully deleted"})
    } catch (e){
        console.log('Route Error: ', e)
        next(e)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const {name, description, userId} = req.body
        const newWorkout = await Workout.create(
            {
                name,
                description,
                userId
            }
        )
        let newWorkoutJSON = newWorkout.toJSON();
        let responseBody = {...newWorkoutJSON}
        responseBody.createdAt = newWorkoutJSON.createdAt
        responseBody.updatedAt = newWorkoutJSON.updatedAt
        return res.status(201).json(responseBody)
    } catch (e){
        console.log('Route Error: ', e)
        next(e)
    }
})

router.put('/:workoutId', async (req, res, next) => {
    try {
        const workoutId = parseInt(req.params.workoutId)
        const currentWorkout = await Workout.findByPk(workoutId)
        if (!currentWorkout){
            res.status(404).json({
                message: "Workout couldn't be found"
            })
        }
        const {name, description, userId} = req.body
        const userIdINT = parseInt(userId)
        await currentWorkout.update(
            {
                name,
                description,
                userId: userIdINT
            }
        )
        let currentWorkoutJSON = currentWorkout.toJSON();
        return res.status(201).json(currentWorkoutJSON)
    } catch (e){
        console.log('Route Error: ', e)
        next(e)
    }
})

module.exports = router;