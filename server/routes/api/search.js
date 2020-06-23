const router = require('express').Router()
const Spot = require('../../models/Spot')
const { array } = require('@hapi/joi')
const ObjectId = require('mongodb').ObjectId

router.get('/', async (req, res) => {
    // try {
    //     var foundSpots = new Array()
    //     for (var i = 0; i < req.body.selectedTags.length; i++) {
    //         var categ = req.body.selectedTags[i][0]
    //         var tag = req.body.selectedTags[i][1]
    //         const response = await Spot.find({
    //             [ 'tags.' + categ ]: tag
    //         })
    //         for (var j = 0; j < response.length; j++) {
    //             if (!foundSpots.includes(response[j])) {
    //                 foundSpots.push(response[j])
    //             }
    //         }
    //     }
    //     res.status(200).json({ foundSpots: foundSpots })
    // } catch (error) {
    //     res.status(400).send(error)
    // }
    try {
        const spots = await Spot.find()
        var pictures = new Array()
        for (var i = 0; i < spots.length; i++) {
            if (spots[i].picture) {
                pictures.push(Buffer.from(spots[i].picture).toString('base64'))
            } else {
                pictures.push('')
            }
        }
        res.status(200).json({ spots: spots, pictures: pictures })
    } catch (error) {
        res.status(400).send(error)
    }
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