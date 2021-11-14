const router = require('express').Router()
const controller = require('../controller/reflectionController')
const token = require('../config/cektoken')
const response = require('../utils/response')

router.post('/', (req, res) => {
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

router.get('/', (req, res) => {
    if (token.cek(req)) {
        const ownerId = token.cek(req).id
        controller.getUserReflections(ownerId)
            .then(data =>{
                res.status(data.code).json(data)
            })
            .catch(err => {
                res.status(err.code).json(err)
            })
    } else {
        res.status(401).json(response.commonTokenError('Authorization failed'))
    }
})

router.delete('/:id', (req, res) => {
    if (token.cek(req)) {
        const ownerId = token.cek(req).id
        const reflectionId = req.params.id

        controller.deleteReflectionById(reflectionId, ownerId)
            .then(data => {
                res.status(data.code).json(data)
            })
            .catch(err => {
                res.status(err.code).json(err)
            })
    } else {
        res.status(401).json(response.commonTokenError('Authorization failed'))
    }
})

router.put('/:id', (req,res) => {
    if (token.cek(req)) {
        const ownerId = token.cek(req).id
        const reflectionId = req.params.id
        const value = req.body

        controller.updateReflectionById(reflectionId, ownerId, value)
            .then(data => {
                res.status(data.code).json(data)
            })
            .catch(err => {
                res.status(err.code).json(err)
            })
    } else {
        res.status(401).json(response.commonTokenError('Authorization failed'))
    }
})
module.exports = router