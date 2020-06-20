const router = require('express').Router()
const Spot = require('../../models/Spot')
const { array } = require('@hapi/joi')
const ObjectId = require('mongodb').ObjectId

router.get('/', async (req, res) => {

})

router.get('/live', async (req, res) => {
    console.log(req.query.searchQuery)
    var names = new Array()
    var spotIds = new Array()
    try {
        const response = await Spot.find({
            queryName: {
                $regex: new RegExp(req.query.searchQuery)
            }
        })
        for (var i = 0; i < response.length; i++) {
            names.push(response[i].name)
            spotIds.push(response[i]._id.toString())
        }
        res.status(200).json({ names: names, spotIds: spotIds })
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router