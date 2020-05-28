const router = require('express').Router()
const Core = require('../../models/Core')

router.get('/', async (req, res) => {
    try {
        const core = await Core.find()
        res.status(200).json({ core: core })
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router