// backend/routes/api/workout.js

const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { properUserValidation, handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const { Op } = require('sequelize')
const { User, DayLog, Food, FoodIcon, FoodImage, Weight, Workout, WorkoutIcon, WorkoutImage } = require('../../db/models');
const { response } = require('../../app');


const router = express.Router();


router.get('/hello/world', (req, res) => {
    res.send('api/routes/weights ---> Hello World!');
});

//all 
router.get('/', async (req, res, next) => {
    try {
        const workouts = await Weight.findAll({
            include: [
                { 
                    model: User,
                    attributes: {
                        exclude: ['id', 'hashedPassword', 'updatedAt']
                    } 
                }
            ],
            attributes: {
                exclude: ['userId']
            }
        });

        const answer = workouts.map(e=>{
            const workoutJSON = e.toJSON();
            return workoutJSON
        })     
        res.json({Weights: answer})
    } catch (e) {
        console.log('Route Error: ', e)
        next(e)
    }
});


//one
router.get('/:workoutId', async (req, res, next) => {
    try {
        const workoutId = parseInt(req.params.workoutId)
        const currentWorkout = await Weight.findByPk(workoutId, {
            include: [
                { 
                    model: User,
                    attributes: {
                        exclude: ['id', 'hashedPassword', 'updatedAt']
                    } 
                }
            ],
            attributes: {
                exclude: ['userId']
            }})

        if (!currentWorkout){
            res.status(404).json({
                message: "Weight couldn't be found"
            })
        }

        const currentWorkoutJSON = currentWorkout.toJSON()
        return res.status(201).json(currentWorkoutJSON)
    } catch (e){
        console.log('Route Error: ', e)
        next(e)
    }
});

//delete
router.delete('/:workoutId', async (req, res, next) => {
    try {
        const workoutId = parseInt(req.params.workoutId)
        const currentWorkout = await Weight.findByPk(workoutId)

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
        const {metricSystem, start, goal, current, day, userId} = req.body
        const newWorkout = await Weight.create(
            {
                metricSystem: true, 
                start: parseInt(start), 
                goal: parseInt(goal), 
                current: parseInt(current), 
                day: Date.now(), 
                userId: parseInt(userId)
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

router.put('/:weightId', async (req, res, next) => {
    try {
        const weightId = req.params.weightId
        const currentWeight = await Weight.findByPk(weightId)

        if (!currentWeight){
            res.status(404).json({
                message: "Weight couldn't be found"
            })
        }
        const {metricSystem, start, goal, current, day, userId} = req.body

        await currentWeight.update(
            {
                metricSystem,
                start: parseInt(start),
                goal: parseInt(goal),
                current: parseInt(current),
                day,
                userId: parseInt(userId)
            }
        )

        let currentWeightJSON = currentWeight.toJSON();
        return res.status(201).json(currentWeightJSON)
    } catch (e){
        console.log('Route Error: ', e)
        next(e)
    }
})



module.exports = router;