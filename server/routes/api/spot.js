const router = require('express').Router()
const Spot = require('../../models/Spot')
const User = require('../../models/User')
const Core = require('../../models/Core')
const ObjectId = require('mongodb').ObjectId
const VerifyAccess = require('../../services/VerifyAccess')

router.post('/new', VerifyAccess, async (req, res) => {
    if (req.body.name === '') {
        return res.status(400).json({ errorMsg: 'You forgot the name!' })
    }
    const newSpot = new Spot({
        name: req.body.name
    })
    try {
        const savedSpot = await newSpot.save()
        res.status(200).json({ spotId: savedSpot._id })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/edit', VerifyAccess, async (req, res) => {
    if (req.body.name) {
        try {
            await Spot.updateOne(
                { _id: new ObjectId(req.body.spotId) },
                { $set: {name: req.body.name} }
            )
            res.status(200).end()
        } catch (error) {
            res.status(400).send(error)
        }
    }

    if (req.body.address) {
        try {
            await Spot.updateOne(
                { _id: new ObjectId(req.body.spotId) },
                { $set: {address: req.body.address} }
            )
            res.status(200).end()
        } catch (error) {
            res.status(400).send(error)
        }
    }
})

module.exports = router