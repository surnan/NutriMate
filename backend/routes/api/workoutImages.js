// backend/routes/api/WorkoutImages.js

const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { properUserValidation, handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const { Op } = require('sequelize')
const { User, Workout, WorkoutImage } = require('../../db/models');


const router = express.Router();


router.get('/hello/world', (req, res) => {
    res.send('api/routes/workoutImages ---> Hello World!');
});

//all
router.get('/', async (req, res, next) => {
    try {
        const allGrubs = await WorkoutImage.findAll()
        const answer = allGrubs.map(e=>{
            const workoutJSON = e.toJSON();
            return workoutJSON
        }) 
        res.json({WorkoutImages: answer})
    } catch (e) {
        console.log('Route Error: ', e)
        next(e)
    }
});

//one
router.get('/:grubId', async (req, res, next) => {
    try {
        const grubId = parseInt(req.params.grubId)
        const currentGrub = await WorkoutImage.findByPk(grubId, {
            include: [{model: Workout}]
        })
        const currentGrubJSON = currentGrub.toJSON()
        return res.status(201).json(currentGrubJSON)
    } catch (e) {
        console.log('Route Error: ', e)
        next(e)
    }
});


router.post('/', async (req, res, next) => {
    try {
        const {url, workoutId, name} = req.body
        const newGrub = await WorkoutImage.create(
            {
                url,
                name,
                workoutId: parseInt(workoutId)
            }
        )
        let newWorkoutJSON = newGrub.toJSON();
        let responseBody = {...newWorkoutJSON}
        responseBody.createdAt = newWorkoutJSON.createdAt
        responseBody.updatedAt = newWorkoutJSON.updatedAt
        return res.status(201).json(responseBody)
    } catch (e){
        console.log('Route Error: ', e)
        next(e)
    }
})

router.delete('/:grubId', async (req, res, next) => {
    try {
        const grubId = parseInt(req.params.grubId)
        const currentGrub = await WorkoutImage.findByPk(grubId)
        if (!currentGrub){
            res.status(404).json({
                message: "Grub couldn't be found"
            })
        }
        currentGrub.destroy();
        res.json({"message": "Successfully deleted"})
    } catch (e){
        console.log('Route Error: ', e)
        next(e)
    }
})


router.put('/:WorkoutImageId', async (req, res, next) => {
    try {
        const WorkoutImageId = parseInt(req.params.WorkoutImageId)
        const currentWorkoutImage = await WorkoutImage.findByPk(WorkoutImageId)
        if (!currentWorkoutImage){
            res.status(404).json({
                message: "WorkoutImage couldn't be found"
            })
        }
        const {url, grubId, name} = req.body
        await currentWorkoutImage.update(
            {
                name,
                url,
                grubId: parseInt(grubId)
            }
        )
        let currentWorkoutImageJSON = currentWorkoutImage.toJSON();
        return res.status(201).json(currentWorkoutImageJSON)
    } catch (e){
        console.log('Route Error: ', e)
        next(e)
    }
})


module.exports = router;