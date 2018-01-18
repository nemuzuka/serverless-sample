'use strict';

const sjcl = require('sjcl')
const aws = require('aws-sdk')
const dao = require('./dao.js')

module.exports.get = (event, context, callback) => {

  initialize(event).then(
    (userId)=>{
      return dao.readOne(getDynamoClient(event), userId);
    },
    (error)=>{
      callback(null, error);
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
  );
};

module.exports.post = (event, context, callback) => {

  const param = JSON.parse(event.body);
  initialize(event).then(
    (userId)=>{
      return dao.put(getDynamoClient(event), userId, param.value);
    },
    (error)=>{
      callback(null, error);
    }
  ).then(
    (data)=>{
      callback(null, {statusCode: 200, body: JSON.stringify({'msg': 'success'})});
    },
    (error)=>{
      console.log(error);
      callback(null, {statusCode: 400, body: JSON.stringify({'msg': "error"})});
    }
  );
};

const initialize = (event) => {
  return new Promise((resolve, reject) => {
    const token = event.headers.Authorization
    if(typeof token === "undefined" || token == null) {
      reject({
        statusCode: 401,
        body: JSON.stringify({'msg': '認証してからアクセスしてください'})
      });
      return;
    }
    resolve(getUserId(token));
  });
}

const getUserId = (token) => {
  const payload = token.split(".")[1];
  const json = JSON.parse(sjcl.codec.utf8String.fromBits(sjcl.codec.base64url.toBits(payload)));
  return json.sub;
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
