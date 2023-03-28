require("dotenv").config();
var express = require('express')
// var mongoose = require('mongoose')
var path = require('path')
var bodyParser = require('body-parser')
var db = require('../database/index.js');

let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/products', (req, res) => {
  db.list(req.query.page, req.query.count)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(401).send(err);
    });
})


app.get('/products/:product_id', (req, res) => {
  db.information(req.params.product_id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(401).send(err);
    });
})

app.get('/products/:product_id/styles', (req, res) => {
  db.styles(req.params.product_id)
    .then((data) => {
      var obj = {};
      obj.product_id = data.id.toString();
      obj.results = data.styles;
      res.status(200).send(obj);
    })
    .catch((err) => {
      res.status(401).send(err);
    });
})

app.get('/products/:product_id/related', (req, res) => {
  db.related(req.params.product_id)
    .then((data) => {
      res.status(200).send(data.related);
    })
    .catch((err) => {
      res.status(401).send(err);
    });
})

var port = process.env.PORT || 3000;
app.listen(port, err => {
  if (err)
      throw err
  console.log(`listening on port ${port}`);
});