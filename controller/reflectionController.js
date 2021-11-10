const model = require('../models/reflectionModel')
const response = require('../utils/response')
const moment = require('moment')

exports.createDataReflection = (data, ownerId) =>
  new Promise(async (resolve, reject) => {
    Object.assign(data, {
      owner_id: ownerId,
      created_at: moment().format(),
      updated_at: moment().format(),
    })
    model.insertData(data)
      .then((res) => {
        resolve(response.commonSuccessWithData(data))
      }).catch((err) => {
        console.log(err)
        reject(response.commonError)
      })
  })