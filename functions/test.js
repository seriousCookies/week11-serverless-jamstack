const axios = require('axios');
const faunadb = require ('faunadb');

const q = faunadb.query
const client = new faunadb.Client({
    secret: process.env.FAUNADB_SECRET
})

exports.handler = (event, context, callback) => {
    /* parse the string body into a useable JS object */
    const data = JSON.parse(event.body)
    console.log("does this work?", data)
    const item = {
      data: data
    }
    /* construct the fauna query */
    return client.query(q.Create(q.Ref("classes/item"), item))
    .then((response) => {
      console.log("success", response)
      /* Success! return the response with statusCode 200 */
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(response)
      })
    }).catch((error) => {
      console.log("error", error)
      /* Error! return the error with statusCode 400 */
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify(error)
      })
    })
  }