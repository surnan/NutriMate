// backend/routes/api/WorkoutIcons.js

const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { properUserValidation, handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const { Op } = require('sequelize')
const { User, DayLog, Grub, GrubIcon, GrubImage, Workout, WorkoutImage, WorkoutIcon } = require('../../db/models');


const router = express.Router();


router.get('/hello/world', (req, res) => {
    res.send('api/routes/food ---> Hello World!');
});

//all
router.get('/', async (req, res, next) => {
    
    try {
        const allGrubs = await WorkoutIcon.findAll()
        
        
        const answer = allGrubs.map(e=>{
            const workoutJSON = e.toJSON();
            console.log('\n--> e = ', workoutJSON)
            return workoutJSON
        })
        // res.send('entered TRY-Block')       
        res.json({WorkoutIcons: answer})


    } catch (e) {
        // console.log('Route Error: ', e)
        next(e)
    }
});

//one
router.get('/:grubId', async (req, res, next) => {
    
    try {

        const grubId = parseInt(req.params.grubId)
        const currentGrub = await WorkoutIcon.findByPk(grubId, {
            include: [{model: Workout}]
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

        const {url, workoutId, name} = req.body

        const newGrub = await WorkoutIcon.create(
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
        const currentGrub = await WorkoutIcon.findByPk(grubId)

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


router.put('/:WorkoutIconId', async (req, res, next) => {
    // res.send('HELLO FROM put')

    try {

        console.log("===> A")
        const WorkoutIconId = parseInt(req.params.WorkoutIconId)
        const currentWorkoutIcon = await WorkoutIcon.findByPk(WorkoutIconId)

        if (!currentWorkoutIcon){
            res.status(404).json({
                message: "WorkoutIcon couldn't be found"
            })
        }

        console.log("===> B")

        const {url, grubId, name} = req.body


        await currentWorkoutIcon.update(
            {
                name,
                url,
                grubId: parseInt(grubId)
            }
        )

        console.log("===> C")
        let currentWorkoutIconJSON = currentWorkoutIcon.toJSON();


        console.log("===> D")

        // response.json(res)
        return res.status(201).json(currentWorkoutIconJSON)
        console.log("===> E")
 
    } catch (e){
        console.log('Route Error: ', e)
        next(e)
    }
})


module.exports = router;