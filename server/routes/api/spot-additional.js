const router = require('express').Router()
const Spot = require('../../models/Spot')
const User = require('../../models/User')
const ObjectId = require('mongodb').ObjectId
const VerifyAccess = require('../../services/VerifyAccess')

router.get('/opening-hrs', async (req, res) => {
    try {
        const spot = await Spot.findOne(
            { _id: new ObjectId(req.query.spotId) }
        )
        res.status(200).json({ openingHrs: spot.openingHrs })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/gmap', async (req, res) => {
    try {
        const spot = await Spot.findOne(
            { _id: new ObjectId(req.query.spotId) }
        )
        res.status(200).json({ address: spot.address })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/about', async (req, res) => {
    try {
        const spot = await Spot.findOne(
            { _id: new ObjectId(req.query.spotId) }
        )
        res.status(200).json({
            about: spot.about,
            tags: spot.tags
        })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/rate', VerifyAccess, async (req, res) => {
    const spot = await Spot.findOne(
        { _id: new ObjectId(req.body.spotId) }
    )
    const sum = spot.rating.sum + req.body.rating
    const count = spot.rating.count + 1
    const rawAvg = sum / count
    const avg = Math.round(rawAvg * 10) / 10
    try {
        await Spot.updateOne(
            { _id: new ObjectId(req.body.spotId) },
            [
                { $set: {rating: {sum: sum}} },
                { $set: {rating: {count: count}} },
                { $set: {rating: {avg: avg}} }
            ]
        )
        await User.updateOne(
            { username: req.body.user.username },
            { $push: {rated: req.body.spotId} }
        )
        res.status(200).end()
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/rate/check', VerifyAccess, async (req, res) => {
    var alreadyRated = false
    try {
        const user = await User.findOne(
            { username: req.body.user.username, rated: req.body.spotId }
        )
        if (user) {
            alreadyRated = true
        }
        res.status(200).json({ alreadyRated: alreadyRated })
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router