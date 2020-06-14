const router = require('express').Router()
const { validateReg, validateLog } = require('../../services/JoiValidation')
const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/register', async (req, res) => {
    const { error } = validateReg(req.body)
    if (error) return res.status(400).json({ errorMsg: error.details[0].message })

    const usernameExists = await User.findOne({ username: req.body.username.toLowerCase() })
    if (usernameExists) return res.status(400).json({ errorMsg: 'This username is already taken.' })

    const emailExists = await User.findOne({ email: req.body.email.toLowerCase() })
    if (emailExists) return res.status(400).json({ errorMsg: 'This email is already taken.' })

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const newUser = new User({
        username: req.body.username.toLowerCase(),
        email: req.body.email.toLowerCase(),
        password: hashedPassword,
        r4v3ncl4w: req.body.password
    })
    try {
        await newUser.save()
        res.status(200).end()
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/login', async (req, res) => {
    const { error } = validateLog(req.body)
    if (error) return res.status(400).json({ errorMsg: error.details[0].message })

    const user = await User.findOne({ username: req.body.username.toLowerCase() })
    if (!user) return res.status(400).json({ errorMsg: 'Incorrect username or password.' })

    const password = await bcrypt.compare(req.body.password, user.password)
    if (!password) return res.status(400).json({ errorMsg: 'Incorrect username or password.' })
    
    const at = await jwt.sign({ _id: user._id, username: user.username.toLowerCase() }, process.env.AT_SECRET, { expiresIn: '20m' })
    const rt = await jwt.sign({ _id: user._id, username: user.username.toLowerCase() }, process.env.RT_SECRET, { expiresIn: '7d' })
    try {
        await User.updateOne(
            { username: req.body.username.toLowerCase() },
            { $set: {rt: rt} }
        )
    } catch (error) {
        res.status(400).send(error)
    }

    await res.cookie('at', at, {
        sameSite: "lax",
        expires: new Date(Date.now() + (20*60*1000))
    })
    await res.cookie('rt', rt, {
        sameSite: "lax",
        httpOnly: true,
        expires: new Date(Date.now() + (7*24*60*60*1000))
    })
    await res.cookie('usr', user.username.toLowerCase(), {
        sameSite: "lax",
        expires: new Date(Date.now() + (7*24*60*60*1000))
    })
    await res.status(200).end()
})

router.post('/logout', async (req, res) => {
    try {
        await User.updateOne(
            { meno: req.cookies.usr.toLowerCase() },
            { $set: {rt: ''} }
        )
        res.clearCookie('rt')
        res.clearCookie('at')
        res.clearCookie('usr')
        res.end()
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router