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

exports.getDataByOwnerId = (ownerId) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM "reflection" WHERE owner_id = '${ownerId}'`)
      .then(res => {
        resolve(res.rows)
      }).catch(err => {
        reject(err)
      })
  })
}

exports.getDataByDataId = (reflectionId) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM "reflection" WHERE id = '${reflectionId}'`)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

exports.deleteData = (reflectionId, ownerId) => {
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM "reflection" WHERE id = '${reflectionId}' and owner_id = '${ownerId}'`)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
} 

exports.updateData = (reflectionId, ownerId, value) => {
  return new Promise((resolve, reject) => {
    db.query(`UPDATE "reflection"
              set "success" = '${value.success}', "low_point" = '${value.low_point}', 
              "take_away" = '${value.take_away}', "updated_at" = '${value.updated_at}'
              WHERE "id" = '${reflectionId}' and owner_id = '${ownerId}'`)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}