'use strict';

const serverless = require('serverless-http')
const express = require('express')
const app = express()
const ejs = require('ejs')
app.engine('ejs',ejs.renderFile)

const environments = {
  "REGION": process.env.REGION,
  "USER_POOL_ID": process.env.USER_POOL_ID,
  "CLIENT_ID": process.env.CLIENT_ID,
  "IDENTITY_POOL_ID": process.env.IDENTITY_POOL_ID,
  "CONTEXT_PATH": ""
}

app.get('/', function (req, res) {
  res.render('index.ejs', environments);
})

app.get('/top', function (req, res) {
  res.render('top.ejs', environments);
})

app.get('/sign-up', function (req, res) {
  res.render('signUp.ejs', environments);
})

app.get('/confirm/:email', function (req, res) {
  let param = Object.assign({}, environments);
  param.email = req.params.email;
  res.render('confirm.ejs', param);
})


module.exports.handler = serverless(app, {
  request: function(request, event, context) {
    if(JSON.parse(process.env.ONLY_API_GATEWAY) === true) {
      const stage = event.requestContext.stage;
      const path = event.requestContext.path;
      if(typeof path !== 'undefined' && path.indexOf("/" + stage) === 0) {
        environments.CONTEXT_PATH = "/" + stage;
      }
    }
  }
});
