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
                },
                { 
                    model: Grub,
                },
                { 
                    model: Workout,
                }
            ]
        });

        const answer = dayLogs.map(e => {
            const dayLogsJSON = e.toJSON();
            return dayLogsJSON
        })
        res.json({ DayLog: answer })
    } catch (e) {
        console.log('Route Error: ', e)
        next(e)
    }
});

//one
router.get('/:dayLogId', async (req, res, next) => {
    try {
        const dayLogId = parseInt(req.params.dayLogId)
        const currentdayLog = await DayLog.findByPk(dayLogId, {
            include: [
                {
                    model: User,
                    attributes: {
                        exclude: ['hashedPassword', 'updatedAt']
                    }
                },
                { 
                    model: Grub,
                },
                { 
                    model: Workout,
                }
            ]
        })

        if (!currentdayLog) {
            res.status(404).json({
                message: "dayLog couldn't be found"
            })
        }
        const currentdayLogJSON = currentdayLog.toJSON()
        return res.status(201).json(currentdayLogJSON)
    } catch (e) {
        console.log('Route Error: ', e)
        next(e)
    }
});

// router.delete('/:dayLogId', requireAuth, async (req, res, next) => {
router.delete('/:dayLogId', async (req, res, next) => {
    try {
        const dayLogId = parseInt(req.params.dayLogId)
        const currentdayLog = await DayLog.findByPk(dayLogId)
        if (!currentdayLog){
            res.status(404).json({
                message: "dayLog couldn't be found"
            })
        }
        currentdayLog.destroy();
        res.json({"message": "Successfully deleted"})
    } catch (e){
        console.log('Route Error: ', e)
        next(e)
    }
})

// router.post('/', requireAuth, async (req, res, next) => {
router.post('/', async (req, res, next) => {
    try {
        const { name, calories, units, unitType, grubId, userId, workoutId, timestamp } = req.body

        const newdayLog = await DayLog.create(
            {
                name, 
                calories: parseInt(calories), 
                units: parseFloat(units), 
                unitType, 
                grubId: parseInt(grubId) || null, 
                workoutId: parseInt(workoutId) || null, 
                userId: parseInt(userId), 
                grubtId: parseInt(grubId), 
                timestamp 
            }
        )
        let newdayLogJSON = newdayLog.toJSON();
        let responseBody = { ...newdayLogJSON }
        responseBody.createdAt = newdayLogJSON.createdAt
        responseBody.updatedAt = newdayLogJSON.updatedAt
        return res.status(201).json(responseBody)
    } catch (e) {
        console.log('Route Error: ', e)
        next(e)
    }
})

// router.put('/:dayLogId', requireAuth, async (req, res, next) => {
router.put('/:dayLogId', async (req, res, next) => {
    try {
        const dayLogId = parseInt(req.params.dayLogId)
        const currentdayLog = await DayLog.findByPk(dayLogId)
        if (!currentdayLog) {
            res.status(404).json({
                message: "dayLog couldn't be found"
            })
        }
        const { name, calories, units, unitType, grubId, userId, workoutId, timestamp } = req.body
        await currentdayLog.update(
            {
                name, 
                calories: parseInt(calories), 
                units: parseFloat(units), 
                unitType, 
                grubId: parseInt(grubId) || null, 
                workoutId: parseInt(workoutId) || null, 
                userId: parseInt(userId), 
                grubtId: parseInt(grubId), 
                timestamp 
            }
        )
        let currentdayLogJSON = currentdayLog.toJSON();
        return res.status(201).json(currentdayLogJSON)
    } catch (e) {
        console.log('Route Error: ', e)
        next(e)
    }
})


module.exports = router;