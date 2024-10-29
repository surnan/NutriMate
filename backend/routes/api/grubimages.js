// backend/routes/api/GrubImages.js

const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { properUserValidation, handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const { Op } = require('sequelize')
const { User, Grub, GrubImage } = require('../../db/models');
const { singleMulterUpload, singlePublicFileUpload } = require('../../awsS3')


const router = express.Router();


router.get('/hello/world', (req, res) => {
    res.send('api/routes/grubImages ---> Hello World!');
});

//all
router.get('/', async (req, res, next) => {
    try {
        const allGrubs = await GrubImage.findAll()
        const answer = allGrubs.map(e => {
            const workoutJSON = e.toJSON();
            return workoutJSON
        })
        res.json({ GrubImages: answer })
    } catch (e) {
        console.log('Route Error: ', e)
        next(e)
    }
});

//one
router.get('/:grubId', async (req, res, next) => {
    try {
        const grubId = parseInt(req.params.grubId)
        const currentGrub = await GrubImage.findByPk(grubId, {
            include: [{ model: Grub }]
        })
        const currentGrubJSON = currentGrub.toJSON()
        return res.status(201).json(currentGrubJSON)
    } catch (e) {
        console.log('Route Error: ', e)
        next(e)
    }
});


//one
router.get('/grub/:grubId', async (req, res, next) => {
    try {
        const workoutId = parseInt(req.params.grubId);
        const allImages = await GrubImage.findAll({
            where: {
                grubId: grubId
            },
            include: [
                { model: Grub }
            ]
        });

        // .toJSON is not required for Sequelize's findAll response
        return res.status(200).json(allImages);
    } catch (e) {
        console.log('Route Error: ', e);
        next(e);
    }
});



// router.post('/', async (req, res, next) => {
//     try {
//         const { url, workoutId, name } = req.body
//         const newGrub = await WorkoutImage.create(
//             {
//                 url,
//                 name,
//                 workoutId: parseInt(workoutId)
//             }
//         )
//         let newWorkoutJSON = newGrub.toJSON();
//         let responseBody = { ...newWorkoutJSON }
//         responseBody.createdAt = newWorkoutJSON.createdAt
//         responseBody.updatedAt = newWorkoutJSON.updatedAt
//         return res.status(201).json(responseBody)
//     } catch (e) {
//         console.log('Route Error: ', e)
//         next(e)
//     }
// })

router.delete('/:grubId', async (req, res, next) => {
    try {
        const grubId = parseInt(req.params.grubId)
        const currentGrub = await GrubImage.findByPk(grubId)
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

// const workoutId = parseInt(req.params.workoutId);
// const allImages = await WorkoutImage.findAll({
//     where: {
//         workoutId: workoutId
//     },
//     include: [
//         { model: Workout }
//     ]
// });

// AWS
router.put('/:id/update',
    singleMulterUpload('image'),
    async (req, res, next) => {
        console.log("...")
        console.log("...")
        console.log("...")
        console.log("...")
        console.log("entered router.put")
        console.log("...")
        console.log("...")
        console.log("...")
        console.log("...")
        try {
            const grubImageId = parseInt(req.params.id)
            const currentGrubImage = await WorkoutImage.findByPk(grubImageId)
            if (!currentGrubImage) {
                res.status(404).json({
                    message: "WorkoutImage couldn't be found"
                })
            }

            let imgUrl;

            if (req.file) {
                imgUrl = await singlePublicFileUpload(req.file); //converts data from form
                console.log("entered -->  if (req.file) {")
            }

            const { url, grubId, name } = currentWorkoutImage
            await currentGrubImage.update(
                {
                    name,
                    url: imgUrl,
                    grubId: parseInt(grubId)
                }
            )
            let currentGrubImageJSON = currentWorkoutImage.toJSON();
            return res.status(201).json(currentGrubImageJSON)
        } catch (e) {
            console.log('Route Error: ', e)
            next(e)
        }
    })

    // AWS
router.post('/:grubId',
    singleMulterUpload('image'),
    async (req, res, next) => {
        try {
            let imgUrl;

            if (req.file) {
                imgUrl = await singlePublicFileUpload(req.file); //converts data from form
            }
            const grubId = parseInt(req.params.grubId)
            const currentWorkoutImage = await WorkoutImage.create({
                url: imgUrl,
                grubId
            })

            let currentGrubImageJSON = currentGrubImage.toJSON();
            return res.status(201).json(currentGrubImageJSON)
        } catch (e) {
            console.log('Route Error: ', e)
            next(e)
        }
    })

module.exports = router;













// router.put('/:WorkoutImageId', async (req, res, next) => {
//     try {
//         const WorkoutImageId = parseInt(req.params.WorkoutImageId)
//         const currentWorkoutImage = await WorkoutImage.findByPk(WorkoutImageId)
//         if (!currentWorkoutImage){
//             res.status(404).json({
//                 message: "WorkoutImage couldn't be found"
//             })
//         }
//         const {url, grubId, name} = req.body
//         await currentWorkoutImage.update(
//             {
//                 name,
//                 url,
//                 grubId: parseInt(grubId)
//             }
//         )
//         let currentWorkoutImageJSON = currentWorkoutImage.toJSON();
//         return res.status(201).json(currentWorkoutImageJSON)
//     } catch (e){
//         console.log('Route Error: ', e)
//         next(e)
//     }
// })