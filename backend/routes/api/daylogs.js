// backend/routes/api/daylogs.js

const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { properUserValidation, handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const { Op } = require('sequelize')
const { User, Workout, Grub, DayLog } = require('../../db/models');
const { response } = require('../../app');


const router = express.Router();


router.get('/hello/world', (req, res) => {
    res.send('api/routes/daylogs ---> Hello World!**!');
});

//all 
router.get('/', async (req, res, next) => {
    try {
        const dayLogs = await DayLog.findAll({
            include: [
                { 
                    model: User,
                    attributes: {
                        exclude: ['hashedPassword', 'updatedAt']
                    } 
                }
            ]
        });

        const answer = dayLogs.map(e=>{
            const dayLogsJSON = e.toJSON();
            return dayLogsJSON
        })     
        res.json({DayLog: answer})
    } catch (e) {
        console.log('Route Error: ', e)
        next(e)
    }
});


module.exports = router;