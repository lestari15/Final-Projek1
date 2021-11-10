const db = require('../config/connection')

exports.findOne = async (field, value) =>
  new Promise(async (resolve, reject) => {
    await db.query(`SELECT * FROM "users" WHERE ${field} = '${value}'`)
      .then(res => {
        resolve(res.rows[0])
      }).catch((err) => {
        reject(err)
      })
  })

exports.insertData = async (value) =>
  new Promise(async (resolve, reject) => {
    await db.query(`INSERT INTO "users" (nama, email, password, created_at, updated_at) VALUES ('${value.nama}', '${value.email}', '${value.password}', '${value.created_at}', '${value.updated_at}')`)
      .then(res => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
  })