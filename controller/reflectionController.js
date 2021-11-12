const model = require('../models/reflectionModel')
const response = require('../utils/response')
const {validateData} = require('../utils/validateData')
const moment = require('moment')

exports.createDataReflection = (data, ownerId) =>
  new Promise(async (resolve, reject) => {
    //validate reflection
    if (validateData(data) != true) {
      reject(response.commonDataError(validateData(data)))
    }

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

exports.getUserReflections = (ownerId) => {
  return new Promise((resolve, reject) => {
    model.getDataByOwnerId(ownerId)
      .then(res => {
        resolve(response.commonSuccessWithData(res))
      })
      .catch(err => {
        console.log(err)
        reject(response.commonError)
      })
  })
}

exports.deleteReflectionById = (reflectionId, ownerId) => {
  return new Promise((resolve, reject) => {
    model.getDataByDataId(reflectionId)
      .then(data => {
        //check if reflection with x id is exist or not
        if (data.rowCount < 1) {
          reject(response.commonNotFoundMessage("Reflection not found"))
        } 
      
        //check if reflection with x id is owned by user y
        if (data.rows[0].owner_id != ownerId) {
          reject(response.commonErrormessage("Not allowed to delete this reflection"))
        } 

        //delete the reflection
        model.deleteData(reflectionId, ownerId)
          .then(res => {
            resolve(response.commonSuccess)
          })
          .catch(err => {
            reject(response.commonError)
          })  
      })
      .catch(err => {
        reject(response.commonError)
      })
  })
}

exports.updateReflectionById = (reflectionId, ownerId, value) => {
  return new Promise((resolve, reject) => {
    model.getDataByDataId(reflectionId)
      .then(data => {
        //check if reflection with x id is exist or not
        if (data.rowCount < 1) {
          reject(response.commonNotFoundMessage('Reflection not found'))
        }
        
        //check if reflection with x id is owned by user y
        if (data.rows[0].owner_id != ownerId) {
          reject(response.commonErrormessage('Not allowed to edit this reflection'))
        }

        //validate reflection
        if (validateData(value) != true) {
          reject(response.commonDataError(validateData(value)))
        }

        //add property "updated_at" to object "value"
        Object.assign(value, {
          updated_at: moment().format()
        })


        //update data on database
        model.updateData(reflectionId, ownerId, value)
          .then(res => {
            resolve(response.commonSuccess)
          })
          .catch(err => {
            console.log(err)
            reject(response.commonError)
          })
      })
      .catch(err => {
        reject(response.commonError)
      })
  })
}