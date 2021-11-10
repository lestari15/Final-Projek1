const model = require('../models/usersModel')
const response = require('../utils/response')
const bcrypt = require('bcrypt')
const moment = require('moment')
const jwt = require("jsonwebtoken")

exports.regis = (data) =>
  new Promise(async (resolve, reject) => {
    await model.findOne('email', data.email)
      .then(async (cekEmail) => {
        if (cekEmail) {
          resolve(response.commonErrormessage("Email Sudah digunakan"))
        } else {
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync(data.password, salt);
          Object.assign(data, {
            password: hash,
            created_at: moment().format(),
            updated_at: moment().format(),
          });
          model.insertData(data)
            .then(() => {
              resolve(response.commonSuccess)
            }).catch((err) => {
              console.error(err)
              reject(response.commonError)
            })
        }

      }).catch((err) => {
        console.error(err)
        reject(response.commonError)
      })
  })

exports.login = (data) =>
  new Promise(async (resolve, reject) => {
    await model.findOne('email', data.email)
      .then(async (cekEmail) => {
        console.log(cekEmail)
        if (cekEmail) {
          const password = cekEmail.password
          if (bcrypt.compare(data.password, password)) {
            const token = jwt.sign(cekEmail, "rahasia", { expiresIn: '1d' })
            resolve(response.commonSuccessLogin(cekEmail, token))
          } else {
            reject(response.commonErrormessage("Password salah"))
          }
        } else {
          reject(response.commonErrormessage("Email salah"))
        }
      }).catch(err => {
        console.log(err)
      })
  })