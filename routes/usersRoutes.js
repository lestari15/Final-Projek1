const router = require('express').Router()
const controller = require('../controller/usersController')

router.post('/register', (req, res) => {
    controller.regis(req.body).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

router.post('/login', (req, res) => {
    controller.login(req.body).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

module.exports = router