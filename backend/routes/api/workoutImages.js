// backend/routes/api/WorkoutImages.js

const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { properUserValidation, handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const { Op } = require('sequelize')
const { User, Workout, WorkoutImage } = require('../../db/models');
const { singleMulterUpload, singlePublicFileUpload } = require('../../awsS3')


const router = express.Router();


router.get('/hello/world', (req, res) => {
    res.send('api/routes/workoutImages ---> Hello World!');
});

//all
router.get('/', async (req, res, next) => {
    try {
        const allGrubs = await WorkoutImage.findAll()
        const answer = allGrubs.map(e => {
            const workoutJSON = e.toJSON();
            return workoutJSON
        })
        res.json({ WorkoutImages: answer })
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
            include: [{ model: Workout }]
        })
        const currentGrubJSON = currentGrub.toJSON()
        return res.status(201).json(currentGrubJSON)
    } catch (e) {
        console.log('Route Error: ', e)
        next(e)
    }
});


//one
router.get('/workout/:workoutId', async (req, res, next) => {
    try {
        const workoutId = parseInt(req.params.workoutId);
        const allImages = await WorkoutImage.findAll({
            where: {
                workoutId: workoutId
            },
            include: [
                { model: Workout }
            ]
        });

        // .toJSON is not required for Sequelize's findAll response
        return res.status(200).json(allImages);
    } catch (e) {
        console.log('Route Error: ', e);
        next(e);
    }
});

router.delete('/:grubId', async (req, res, next) => {
    try {
        const grubId = parseInt(req.params.grubId)
        const currentGrub = await WorkoutImage.findByPk(grubId)
        if (!currentGrub) {
            res.status(404).json({
                message: "Grub couldn't be found"
            })
        }
        currentGrub.destroy();
        res.json({ "message": "Successfully deleted" })
    } catch (e) {
        console.log('Route Error: ', e)
        next(e)
    }
})



// AWS
router.put('/:id/update',
    singleMulterUpload('image'),
    async (req, res, next) => {
        try {
            const workoutImageId = parseInt(req.params.id)
            const currentWorkoutImage = await WorkoutImage.findByPk(workoutImageId)
            if (!currentWorkoutImage) {
                res.status(404).json({
                    message: "WorkoutImage couldn't be found"
                })
            }

            let imgUrl;

            if (req.file) {
                imgUrl = await singlePublicFileUpload(req.file); //converts data from form
                console.log("entered -->  if (req.file) {")
            }

            const { url, workoutId, name } = currentWorkoutImage
            await currentWorkoutImage.update(
                {
                    name,
                    url: imgUrl,
                    workoutId: parseInt(workoutId)
                }
            )
            let currentWorkoutImageJSON = currentWorkoutImage.toJSON();
            return res.status(201).json(currentWorkoutImageJSON)
        } catch (e) {
            console.log('Route Error: ', e)
            next(e)
        }
    })

    // AWS
router.post('/',
    singleMulterUpload('image'),
    async (req, res, next) => {
        try {
            let imgUrl;
            
            if (req.file) {
                imgUrl = await singlePublicFileUpload(req.file); //converts data from form
            }
            const workoutId = parseInt(req.body.workoutId)
            const currentWorkoutImage = await WorkoutImage.create({
                url: imgUrl,
                workoutId
            })

            let currentWorkoutImageJSON = currentWorkoutImage.toJSON();
            return res.status(201).json(currentWorkoutImageJSON)
        } catch (e) {
            console.log('Route Error: ', e)
            next(e)
        }
    })

module.exports = router;