// backend/routes/api/GrubImages.js

const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { properUserValidation, handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const { Op } = require('sequelize')
const { User, DayLog, Grub, GrubIcon, GrubImage, Workout, WorkoutIcon, WorkoutImage } = require('../../db/models');


const router = express.Router();


router.get('/hello/world', (req, res) => {
    res.send('api/routes/food ---> Hello World!');
});

//all
router.get('/', async (req, res, next) => {
    
    try {
        const allGrubs = await GrubImage.findAll()
        
        
        const answer = allGrubs.map(e=>{
            const workoutJSON = e.toJSON();
            console.log('\n--> e = ', workoutJSON)
            return workoutJSON
        })   
        res.json({GrubImages: answer})
    } catch (e) {
        next(e)
    }
});

//one
router.get('/:grubId', async (req, res, next) => {
    try {
        const grubId = parseInt(req.params.grubId)
        const currentGrub = await GrubImage.findByPk(grubId, {
            include: [{model: Grub}]
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
        const {url, grubId, name} = req.body
        const newGrub = await GrubImage.create(
            {
                url,
                name,
                grubId: parseInt(grubId)
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
        const currentGrub = await GrubImage.findByPk(grubId)

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


router.put('/:GrubImageId', async (req, res, next) => {
    try {
        const GrubImageId = parseInt(req.params.GrubImageId)
        const currentGrubImage = await GrubImage.findByPk(GrubImageId)
        if (!currentGrubImage){
            res.status(404).json({
                message: "GrubImage couldn't be found"
            })
        }
        const {url, grubId, name} = req.body
        await currentGrubImage.update(
            {
                name,
                url,
                grubId: parseInt(grubId)
            }
        )
        let currentGrubImageJSON = currentGrubImage.toJSON();
        return res.status(201).json(currentGrubImageJSON)
    } catch (e){
        console.log('Route Error: ', e)
        next(e)
    }
})


module.exports = router;