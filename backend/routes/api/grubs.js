// backend/routes/api/workout.js

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
        const allGrubs = await Grub.findAll({
            include: [
                {
                    model: User,
                    attributes: {
                        exclude: ['id', 'hashedPassword', 'updatedAt']
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
            console.log('\n--> e = ', workoutJSON)
            return workoutJSON
        })
        // res.send('entered TRY-Block')       
        res.json({Grubs: answer})


    } catch (e) {
        // console.log('Route Error: ', e)
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
                        exclude: ['id', 'hashedPassword', 'updatedAt']
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
        // console.log('Route Error: ', e)
        next(e)
    }
});


router.post('/', async (req, res, next) => {
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
                protein: parseInt(protein),
                fats: parseInt(fats),
                carbs: parseInt(carbs),
                sugar: parseInt(sugar),
                company,
                description,
                userId: parseInt(userId)
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


router.put('/:grubId', async (req, res, next) => {
    // res.send('HELLO FROM put')

    try {

        console.log("===> A")
        const grubId = parseInt(req.params.grubId)
        const currentGrub = await Grub.findByPk(grubId)

        if (!currentGrub){
            res.status(404).json({
                message: "Grub couldn't be found"
            })
        }

        console.log("===> B")

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

        console.log("===> C")
        let currentGrubJSON = currentGrub.toJSON();


        console.log("===> D")

        // response.json(res)
        return res.status(201).json(currentGrubJSON)
        console.log("===> E")
 
    } catch (e){
        console.log('Route Error: ', e)
        next(e)
    }
})


module.exports = router;