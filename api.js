'use strict';

const aws = require('aws-sdk')
const dao = require('./dao.js')
const tokenUtil = require('./token.js')
const jwt = require('jsonwebtoken')

module.exports.get = (event, context, callback) => {

  initialize(event, callback).then(
    (userId)=>{
      return dao.readOne(getDynamoClient(event), userId);
    }
  ).then(
    (data)=>{
      let value = "";
      if(Object.keys(data).length !== 0) {
        value = data.Item.value;
      }
      callback(null, {statusCode: 200, body: JSON.stringify({'value': value})});
    },
    (error)=>{
      console.log(error)
      callback(null, {statusCode: 400, body: JSON.stringify({'msg': 'error'})});
    }
  ).catch(
    (error) => {
      console.log(error)
    }
  );
};

module.exports.post = (event, context, callback) => {

  const param = JSON.parse(event.body);
  initialize(event, callback).then(
    (userId)=>{
      return dao.put(getDynamoClient(event), userId, param.value);
    }
  ).then(
    (data)=>{
      callback(null, {statusCode: 200, body: JSON.stringify({'msg': 'success'})});
    },
    (error)=>{
      console.log(error);
      callback(null, {statusCode: 400, body: JSON.stringify({'msg': "error"})});
    }
  ).catch(
    (error) => {
      console.log(error)
    }
  );
};

const initialize = (event, callback) => {
  return new Promise((resolve, reject) => {
    const token = event.headers.Authorization
    if(typeof token === "undefined" || token == null || tokenUtil.verify(token) === false) {
      callback(null, {
        statusCode: 401,
        body: JSON.stringify({'msg': '認証してからアクセスしてください'})
      });
      reject("token error")
    } else {
      resolve(getUserId(token));
    }
  });
}

const getUserId = (token) => {
  var decoded = jwt.decode(token, { complete: true });
  return decoded.payload.sub;
}

const getDynamoClient = (event) => {
    if ("isOffline" in event && event.isOffline) {
        return new aws.DynamoDB.DocumentClient({
            region: "localhost",
            endpoint: "http://localhost:8000"
        });
    } else {
        return new aws.DynamoDB.DocumentClient();
    }
}
