const router = require('express').Router()
const controller = require('../controller/reflectionController')
const token = require('../config/cektoken')
const response = require('../utils/response')

router.post('/input', (req, res) => {
    if (token.cek(req)) {
        const ownerId = token.cek(req).id
        controller.createDataReflection(req.body, ownerId).then(data => {
            res.json(data)
        }).catch(err => {
            res.json(err)
        })
    } else {
        res.json(response.commonTokenError('Authorization failed'))
    }
})

module.exports = router