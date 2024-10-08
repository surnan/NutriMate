// backend/routes/api/grubIcons.js

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
        const allGrubs = await GrubIcon.findAll()
        const answer = allGrubs.map(e=>{
            const workoutJSON = e.toJSON();
            return workoutJSON
        })  
        res.json({GrubIcons: answer})
    } catch (e) {
        console.log('Route Error: ', e)
        next(e)
    }
});

//one
router.get('/:grubId', async (req, res, next) => {
    try {
        const grubId = parseInt(req.params.grubId)
        const currentGrub = await GrubIcon.findByPk(grubId, {
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

        const newGrub = await GrubIcon.create(
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
        const currentGrub = await Grub.findByPk(grubId)

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


router.put('/:grubIconId', async (req, res, next) => {
    try {
        const grubIconId = parseInt(req.params.grubIconId)
        const currentGrubIcon = await GrubIcon.findByPk(grubIconId)
        if (!currentGrubIcon){
            res.status(404).json({
                message: "GrubIcon couldn't be found"
            })
        }
        const {url, grubId, name} = req.body
        await currentGrubIcon.update(
            {
                name,
                url,
                grubId: parseInt(grubId)
            }
        )
        let currentGrubIconJSON = currentGrubIcon.toJSON();
        return res.status(201).json(currentGrubIconJSON)
    } catch (e){
        console.log('Route Error: ', e)
        next(e)
    }
})


module.exports = router;