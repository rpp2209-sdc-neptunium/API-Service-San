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
  db.listProducts(req.query.page, req.query.count)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(401).send(err);
    });
})

app.get('/products/:product_id/related', (req, res) => {
  db.relatedProducts(req.params.product_id)
    .then((data) => {
      var result = [];
      data.forEach((data) => result.push(data.related_product_id));
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(401).send(err);
    });
})


app.get('/products/:product_id', (req, res) => {
  db.informationProducts(req.params.product_id)
    .then((data) => {
      var obj = {};
      obj.id = data.id;
      obj.name = data.name;
      obj.slogan = data.slogan;
      obj.description = data.description;
      obj.category = data.category;
      obj.default_price = data.default_price;
      db.featuresBy(req.params.product_id)
        .then((features) => {
          obj.features = features;
          res.status(200).send(obj);
        });
    })
    .catch((err) => {
      res.status(401).send(err);
    });
})

app.get('/products/:product_id/styles', (req, res) => {
  db.stylesProducts(req.params.product_id)
    .then((data) => {
      res.status(200).send(data);
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