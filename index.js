const serverless = require('serverless-http')
const express = require('express')
const app = express()
const ejs = require('ejs')
app.engine('ejs',ejs.renderFile)

app.get('/', function (req, res) {
  res.render('index.ejs');
})

module.exports.handler = serverless(app);
