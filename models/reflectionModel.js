const db = require('../config/connection')

exports.insertData = async (value) =>
  new Promise(async (resolve, reject) => {
    await db.query(`INSERT INTO "reflection" 
                    (success, low_point, take_away, owner_id, created_at, updated_at) 
                    VALUES 
                    ('${value.success}', '${value.low_point}', '${value.take_away}', '${value.owner_id}', '${value.created_at}', '${value.updated_at}')`)
      .then(res => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
  })