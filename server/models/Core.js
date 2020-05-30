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
    },
    tags: {
        price: {
            type: Array
        },
        services: {
            type: Array
        },
        atmosphere: {
            type: Array
        },
        environment: {
            type: Array
        },
        size: {
            type: Array
        },
        smoking: {
            type: Array
        },
        food: {
            type: Array
        },
        beverages: {
            type: Array
        },
        events: {
            type: Array
        },
        entertainment: {
            type: Array
        },
        stock: {
            type: Array
        },
    }
})

module.exports = mongoose.model('Core', coreSchema, 'core')