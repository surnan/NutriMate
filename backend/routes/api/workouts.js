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

router.get('/', async (req, res, next) => {
    console.log('\n\nentered get route!!!\n\n')
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
                },
                { 
                    model: WorkoutImage,
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
    // res.send('HELLO FROM post')

    try {

        const {name, description, User} = req.body

        const newWorkout = await Workout.create(
            {
                name,
                description,
                userId: 2
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
    // res.send('HELLO FROM put')

    try {

        console.log("===> A")
        const workoutId = parseInt(req.params.workoutId)
        const currentWorkout = await Workout.findByPk(workoutId)

        if (!currentWorkout){
            res.status(404).json({
                message: "Workout couldn't be found"
            })
        }

        console.log("===> B")
        const {name, description, userId} = req.body

        const userIdINT = parseInt(userId)

        await currentWorkout.update(
            {
                name,
                description,
                userId: userIdINT
            }
        )

        console.log("===> C")
        let currentWorkoutJSON = currentWorkout.toJSON();


        console.log("===> D")

        // response.json(res)
        return res.status(201).json(currentWorkoutJSON)
        console.log("===> E")
 
    } catch (e){
        console.log('Route Error: ', e)
        next(e)
    }


})



module.exports = router;