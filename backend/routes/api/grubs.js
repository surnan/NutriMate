// backend/routes/api/workout.js

const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { properUserValidation, handleValidationErrors } = require('../../utils/validation');
const { check, body } = require('express-validator');
const { Op } = require('sequelize')
const { User, DayLog, Grub, GrubIcon, GrubImage, Workout, WorkoutIcon, WorkoutImage } = require('../../db/models');


const router = express.Router();


router.get('/hello/world', (req, res) => {
    res.send('api/routes/food ---> Hello World!');
});

//all
router.get('/', async (req, res, next) => {
    try {
        const allGrubs = await Grub.findAll({
            include: [
                {
                    model: User,
                    attributes: {
                        exclude: ['hashedPassword', 'updatedAt']
                    } 
                },
                { 
                    model: GrubIcon,
                },
                { 
                    model: GrubImage,
                }
            ]
        })
        const answer = allGrubs.map(e=>{
            const workoutJSON = e.toJSON();
            return workoutJSON
        })
        res.json({Grubs: answer})
    } catch (e) {
        console.log('Route Error: ', e)
        next(e)
    }
});

//one
router.get('/:grubId', async (req, res, next) => {
    try {
        const grubId = parseInt(req.params.grubId)
        const currentGrub = await Grub.findByPk(grubId, {
            include: [
                {
                    model: User,
                    attributes: {
                        exclude: ['hashedPassword', 'updatedAt']
                    } 
                },
                { 
                    model: GrubIcon,
                },
                { 
                    model: GrubImage,
                }
            ]
        })
        const currentGrubJSON = currentGrub.toJSON()
        return res.status(201).json(currentGrubJSON)
    } catch (e) {
        console.log('Route Error: ', e)
        next(e)
    }
});


router.post('/', requireAuth, async (req, res, next) => {
    try {
        const {name, description} = req.body
        const {servingSize, servingUnit, calories, protein, fats} = req.body
        const {carbs, sugar, company, userId} = req.body
        const newGrub = await Grub.create(
            {
                name,
                servingSize: parseInt(servingSize),
                servingUnit,
                calories: parseInt(calories),
                protein: parseInt(protein) || 0,
                fats: parseInt(fats) || 0,
                carbs: parseInt(carbs) || 0,
                sugar: parseInt(sugar) || 0,
                company,
                description,
                userId: parseInt(userId)
            }
        )
        console.log("")
        console.log("")
        console.log("body ====> ", body)
        console.log("")
        console.log("")
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

router.delete('/:grubId', requireAuth, async (req, res, next) => {
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


router.put('/:grubId', requireAuth, async (req, res, next) => {
    try {
        const grubId = parseInt(req.params.grubId)
        const currentGrub = await Grub.findByPk(grubId)
        if (!currentGrub){
            res.status(404).json({
                message: "Grub couldn't be found"
            })
        }
        const {name, description} = req.body
        const {servingSize, servingUnit, calories, protein, fats} = req.body
        const {carbs, sugar, company, userId} = req.body
        const userIdINT = parseInt(userId)
        await currentGrub.update(
            {
                name,
                servingSize: parseInt(servingSize),
                servingUnit,
                calories: parseInt(calories),
                protein: parseInt(protein),
                fats: parseInt(fats),
                carbs: parseInt(carbs),
                sugar: parseInt(sugar),
                company,
                description,
                userId: parseInt(userId)
            }
        )
        let currentGrubJSON = currentGrub.toJSON();
        return res.status(201).json(currentGrubJSON)
    } catch (e){
        console.log('Route Error: ', e)
        next(e)
    }
})


module.exports = router;