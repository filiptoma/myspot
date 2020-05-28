const mongoose = require('mongoose')

const spotSchema = new mongoose.Schema({
    name: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    categories: {
        type: Array
    },
    tags: {
        type: Array
    },
    rating: {
        sum: {
            type: Number,
            default: 0
        },
        count: {
            type: Number,
            default: 0
        },
        avg: {
            type: Number,
            default: 0
        }
    },
    comments: {
        type: Array
    },
    picture: {
        type: Buffer
    },
    openingHrs: {
        monday: {
            from: {
                type: String,
                default: ''
            },
            to: {
                type: String,
                default: ''
            }
        },
        tuesday: {
            from: {
                type: String,
                default: ''
            },
            to: {
                type: String,
                default: ''
            }
        },
        wednesday: {
            from: {
                type: String,
                default: ''
            },
            to: {
                type: String,
                default: ''
            }
        },
        thursday: {
            from: {
                type: String,
                default: ''
            },
            to: {
                type: String,
                default: ''
            }
        },
        friday: {
            from: {
                type: String,
                default: ''
            },
            to: {
                type: String,
                default: ''
            }
        },
        saturday: {
            from: {
                type: String,
                default: ''
            },
            to: {
                type: String,
                default: ''
            }
        },
        sunday: {
            from: {
                type: String,
                default: ''
            },
            to: {
                type: String,
                default: ''
            }
        }
    },
    about: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    },
    web: {
        type: String,
        default: ''
    },
    facebook: {
        type: String,
        default: ''
    },
    instagram: {
        type: String,
        default: ''
    }
})

module.exports = mongoose.model('Spot', spotSchema, 'spots')