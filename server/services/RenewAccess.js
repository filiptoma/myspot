const jwt = require('jsonwebtoken')
const router = require('express').Router()

router.get('/', async (req, res) => {
    const rt = req.cookies.rt
    if (rt) {
        jwt.verify(rt, process.env.RT_SECRET, (error, user) => {
            if (error) {
                return res.status(403).send('Invalid or expired access key.')
            }
            const at = jwt.sign({ _id: user._id, username: user.username }, process.env.AT_SECRET, { expiresIn: '20m' })
            res.cookie('at', at, {
                sameSite: "lax",
                expires: new Date(Date.now() + (20*60*1000))
            }).end()
        })
    } else {
        res.status(401).json({ errorMsg: 'You have to be logged in.' })
    }
})

module.exports = router