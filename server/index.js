const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()

////////////////////////////////////////////////////////////////

const mongoose = require('mongoose')

const renewAccessRoute = require('./services/RenewAccess')
const authRoute = require('./routes/api/auth')
const spotRoute = require('./routes/api/spot')
const spotAdditionalRoute = require('./routes/api/spot-additional')
const coreRoute = require('./routes/api/core')

const dotenv = require('dotenv')
dotenv.config()

const cors = require('cors')
const corsOptions = {
  origin: 'https://myspotsk.herokuapp.com/',
  optionsSuccessStatus: 200
}

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

mongoose.connect(
  process.env.MONGODB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => console.log('connected to DB!')
)

////////////////////////////////////////////////////////////////

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  /////////////////////////////////////////////////////////////

  app.use(bodyParser.json({ limit: '50mb' }))
  app.use(cors(corsOptions))
  app.use(cookieParser())

  app.use('/api/renewAccess', renewAccessRoute)
  app.use('/api/auth', authRoute)
  app.use('/api/spot', spotRoute)
  app.use('/api/spot-additional', spotAdditionalRoute)
  app.use('/api/core', coreRoute)

  /////////////////////////////////////////////////////////////

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
