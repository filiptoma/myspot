const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    const at = req.cookies.at
    if (at) {
        jwt.verify(at, process.env.AT_SECRET, (error, user) => {
            if (error) {
                return res.status(403).send('Invalid or expired access key.')
            }
            req.body.user = user
            next()
        })
    } else {
        res.status(401).json({ errorMsg: 'Access expired.' })
    }
}