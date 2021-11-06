const model = require('../models/usersModel')
const response = require('../utils/response')
const bcrypt = require('bcrypt')
const moment = require('moment')
const jwt = require("jsonwebtoken")

exports.regis = (data) =>
    new Promise(async (resolve, reject) => {
        await model.findAll({
            where: { email: data.email },
        }).then(async (cekEmail) => {
            if (cekEmail.length > 0) {
                resolve(response.commonErrormessage("Email Sudah digunakan"))
            } else {
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(data.password, salt);
                Object.assign(data, {
                    password: hash,
                    created_at: moment().toDate().getTime(),
                    updated_at: moment().toDate().getTime(),
                });
                model.create(data)
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
        await model.findAll({
            where: { email: data.email },
            raw: true,
            nest: true
        }).then(async (cekEmail) => {
            console.log(cekEmail[0])
            if (cekEmail.length > 0) {
                const password = cekEmail[0].password
                if (bcrypt.compare(data.password, password)) {
                    const token = jwt.sign(cekEmail[0], "rahasia", { expiresIn: '1d' })
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