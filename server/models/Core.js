const mongoose = require('mongoose')

const coreSchema = new mongoose.Schema({
    categories: {
        drink: {
            type: Array
        },
        food: {
            type: Array
        },
        chill: {
            type: Array
        },
        shop: {
            type: Array
        },
        music: {
            type: Array
        }
    }
})

module.exports = mongoose.model('Core', coreSchema, 'core')