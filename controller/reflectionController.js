const model = require('../models/reflectionModel')
const response = require('../utils/response')
const moment = require('moment')
const jwt = require("jsonwebtoken")

exports.createDataReflection = (data, ownerId) =>
    new Promise(async (resolve, reject) => {
        Object.assign(data, {
            owner_id: ownerId,
            created_at: moment().toDate(),
            updated_at: moment().toDate(),
        })
        model.create(data)
            .then(() => {
                resolve(response.commonSuccessWithData(data))
            }).catch((err) => {
                console.log(err)
                reject(response.commonError)
            })
    })