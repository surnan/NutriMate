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
            ],
            attributes: {
                exclude: ['userId']
            }
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


module.exports = router;