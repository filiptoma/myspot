const router = require('express').Router()
const Spot = require('../../models/Spot')
const User = require('../../models/User')
const ObjectId = require('mongodb').ObjectId
const VerifyAccess = require('../../services/VerifyAccess')

router.get('/get', async (req, res) => {
    try {
        const spot = await Spot.findOne(
            { _id: new ObjectId(req.query.spotId) }
        )
        res.status(200).json({ comments: spot.comments })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/post', VerifyAccess, async (req, res) => {
    try {
        await Spot.updateOne(
            { _id: new ObjectId(req.body.spotId) },
            { $push: {
                comments: {
                    text: req.body.text,
                    date: new Date(Date.now()),
                    author: req.body.user.username,
                    likes: 0,
                    _id: new ObjectId()
                }
            } }
        )
        res.status(200).end()
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/like', VerifyAccess, async (req, res) => {
    try {
        const spot = await Spot.findOne(
            {
                _id: new ObjectId(req.body.spotId),
                "comments._id": new ObjectId(req.body.commentId)
            },
            { "comments.$": 1 }
        )
        const updatedLikes = spot.comments[0].likes + 1
        await Spot.updateOne(
            {
                _id: new ObjectId(req.body.spotId),
                "comments._id": new ObjectId(req.body.commentId)
            },
            { $set: {"comments.$.likes": updatedLikes} }
        )
        await User.updateOne(
            { username: req.body.user.username },
            { $push: {liked: req.body.commentId} }
        )
        res.status(200).end()
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/unlike', VerifyAccess, async (req, res) => {
    try {
        const spot = await Spot.findOne(
            {
                _id: new ObjectId(req.body.spotId),
                "comments._id": new ObjectId(req.body.commentId)
            },
            { "comments.$": 1 }
        )
        const updatedLikes = spot.comments[0].likes - 1
        await Spot.updateOne(
            {
                _id: new ObjectId(req.body.spotId),
                "comments._id": new ObjectId(req.body.commentId)
            },
            { $set: {"comments.$.likes": updatedLikes} }
        )
        await User.updateOne(
            { username: req.body.user.username },
            { $pull: {liked: req.body.commentId} }
        )
        res.status(200).end()
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/already-liked', VerifyAccess, async (req, res) => {
    try {
        const userData = await User.findOne(
            { username: req.body.user.username }
        )
        res.status(200).json({ alreadyLiked: userData.liked })
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router