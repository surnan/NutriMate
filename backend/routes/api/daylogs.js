// backend/routes/api/daylogs.js

const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { properUserValidation, handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const { Op } = require('sequelize')
const { User, Workout, Grub, Daylog } = require('../../db/models');
const { response } = require('../../app');


const router = express.Router();


router.get('/hello/world', (req, res) => {
    res.send('api/routes/daylogs ---> Hello World!**!');
});

//all 
router.get('/', async (req, res, next) => {
    try {
        const workouts = await Daylog.findAll({
            include: [
                { 
                    model: User,
                    attributes: {
                        exclude: ['hashedPassword', 'updatedAt']
                    } 
                }
            ]
        });

        const answer = daylogs.map(e=>{
            const daylogsJSON = e.toJSON();
            return daylogsJSON
        })     
        res.json({DayLog: answer})
    } catch (e) {
        console.log('Route Error: ', e)
        next(e)
    }
});


module.exports = router;