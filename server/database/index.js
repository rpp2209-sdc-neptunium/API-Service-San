require("dotenv").config();
var express = require('express')
var multer = require('multer')
var mongoose = require('mongoose')
var path = require('path')
var bodyParser = require('body-parser')
var csv = require('csvtojson')
var db = require('../../database/index.js');

// var storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './public/uploads')
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname)
//   },
// })
// var uploads = multer({ storage: storage })
mongoose
  .connect(`mongodb://localhost/${process.env.DB_NAME}`)
  .then(() => console.log('Connected'))
  .catch((err) => console.log(err));

let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/product', (req, res) => {
  let findAll = (query, page) => {
    return db.CSVProduct.find({})
      .limit(5)
      .exec();
  };
  findAll()
    .then((obj) => {
      res.status(200).send(obj);
    })
    .catch((err) => {
      res.status(401).send(err);
    })
})

app.get('/features', (req, res) => {
  let findAll = (query, page) => {
    return db.CSVFeatures.find()
      .limit(5)
      .exec();
  };
  findAll()
    .then((obj) => {
      res.status(200).send(obj);
    })
    .catch((err) => {
      res.status(401).send(err);
    })
})

app.get('/related', (req, res) => {
  let findAll = (query, page) => {
    return db.CSVRelated.find()
      .limit(5)
      .exec();
  };
  findAll()
    .then((obj) => {
      res.status(200).send(obj);
    })
    .catch((err) => {
      res.status(401).send(err);
    })
})

app.delete('/related', (req, res) => {
  db.CSVRelated.deleteMany({})
  .then(function(){
    res.status(200).send({
        message: "Successfully Deleted!"
    });
  }).catch(function(error){
    res.status(500).send({
        message: "failure",
        error
    });
  });
})

app.get('/styles', (req, res) => {
  let findAll = (query, page) => {
    return db.CSVStyles.find()
      .limit(5)
      .exec();
  };
  findAll()
    .then((obj) => {
      console.log(obj);
      res.status(200).send(obj);
    })
    .catch((err) => {
      res.status(401).send(err);
    })
})

app.get('/skus', (req, res) => {
  let findAll = (query, page) => {
    return db.CSVSkus.find()
      .skip(0)
      .limit(10)
      .sort( {id: -1})
      .exec();
  };
  findAll()
    .then((obj) => {
      // console.log(obj.length);
      res.status(200).send(obj);
      // res.sendStatus(200);
    })
    .catch((err) => {
      res.status(401).send(err);
    })
})

app.delete('/skus', (req, res) => {
  db.CSVSkus.deleteMany({})
  .then(function(){
    res.status(200).send({
        message: "Successfully Deleted!"
    });
  }).catch(function(error){
    res.status(500).send({
        message: "failure",
        error
    });
  });
})

app.delete('/styles', (req, res) => {
  db.CSVStyles.deleteMany({})
  .then(function(){
    res.status(200).send({
        message: "Successfully Deleted!"
    });
  }).catch(function(error){
    res.status(500).send({
        message: "failure",
        error
    });
  });
})

app.get('/photos', (req, res) => {
  let findAll = (query, page) => {
    return db.CSVPhotos.find()
      .limit(5)
      .exec();
  };
  findAll()
    .then((obj) => {
      res.status(200).send(obj);
    })
    .catch((err) => {
      res.status(401).send(err);
    })
})


// id,name,slogan,description,category,default_price
app.post('/product', (req, res) => {
  csv()
    .fromFile('./data/product.csv')
    .then((jsonObj)=>{
        var army = [];
        for(var i = 0;i < jsonObj.length; i++){
          console.clear();
          console.log(jsonObj.length, i);
            var obj={};
            obj.id=jsonObj[i]['id'];
            obj.name=jsonObj[i]['name'];
            obj.slogan=jsonObj[i]['slogan'];
            obj.description=jsonObj[i]['description'];
            obj.category=jsonObj[i]['category'];
            obj.default_price=jsonObj[i]['default_price'];
            army.push(obj);
        }
        db.CSVProduct.insertMany(army).then(function(){
            res.status(200).send({
                message: "Successfully Uploaded!"
            });
        }).catch(function(error){
            res.status(500).send({
                message: "failure",
                error
            });
        });
    }).catch((error) => {
        res.status(500).send({
            message: "failure",
            error
        });
    })
})

// id,product_id,feature,value
app.post('/features', (req, res) => {
  csv()
    .fromFile('./data/features.csv')
    .then((jsonObj)=>{
        var army = [];
        for(var i = 0;i < jsonObj.length; i++){
          console.clear();
          console.log(jsonObj.length, i);
            var obj={};
            obj.id=jsonObj[i]['id'];
            obj.product_id=jsonObj[i]['product_id'];
            obj.feature=jsonObj[i]['feature'];
            obj.value=jsonObj[i]['value'];
            army.push(obj);
        }
        db.CSVFeatures.insertMany(army).then(function(){
            res.status(200).send({
                message: "Successfully Uploaded!"
            });
        }).catch(function(error){
            res.status(500).send({
                message: "failure",
                error
            });
        });
    }).catch((error) => {
        res.status(500).send({
            message: "failure",
            error
        });
    })
})

// id,styleId,url,thumbnail_url
app.post('/photos', (req, res) => {
  csv()
    .fromFile('./data/photos.csv')
    .then((jsonObj)=>{
        var army = [];
        for(var i = 0;i < jsonObj.length; i++){
          console.clear();
          console.log(jsonObj.length, i);
            var obj={};
            obj.id=jsonObj[i]['id'];
            obj.styleId=jsonObj[i]['styleId'];
            obj.url=jsonObj[i]['url'];
            obj.thumbnail_url=jsonObj[i]['thumbnail_url'];
            army.push(obj);
        }
        db.CSVPhotos.insertMany(army).then(function(){
            res.status(200).send({
                message: "Successfully Uploaded!"
            });
        }).catch(function(error){
            res.status(500).send({
                message: "failure",
                error
            });
        });
    }).catch((error) => {
        res.status(500).send({
            message: "failure",
            error
        });
    })
})

// id,current_product_id,related_product_id
app.post('/related', (req, res) => {
  csv()
    .fromFile('./data/related.csv')
    .then((jsonObj)=>{
        var army = [];
        for(var i = 0;i < jsonObj.length; i++){
          console.clear();
          console.log(jsonObj.length, i);
            var obj={};
            obj.id=jsonObj[i]['id'];
            obj.current_product_id=jsonObj[i]['current_product_id'];
            obj.related_product_id=jsonObj[i]['related_product_id'];
            army.push(obj);
        }
        db.CSVRelated.insertMany(army).then(function(){
            res.status(200).send({
                message: "Successfully Uploaded!"
            });
        })
        .catch(function(error){
            res.status(500).send({
                message: "failure",
                error
            });
        });
    }).catch((error) => {
        res.status(500).send({
            message: "failure",
            error
        });
    })
})

// id,styleId,size,quantity
app.post('/skus', (req, res) => {
  csv()
    .fromFile('./data/skus.csv')
    .then((jsonObj)=>{
        var army = [];
        for(var i = 0;i < jsonObj.length; i++){
          console.clear();
          console.log(jsonObj.length, i);
            var obj={};
            obj.id=jsonObj[i]['id'];
            obj.styleId=jsonObj[i]['styleId'];
            obj.size=jsonObj[i]['size'];
            obj.quantity=jsonObj[i]['quantity'];
            army.push(obj);
        }
        for (var j = 0; j < 1130; j ++) {
          var separate = [];
          for (var i = 0; i < 10000; i ++) {
            var element = army.shift();
            separate.push(element);
          }
          console.log(separate.length);
          console.log(separate[0]);
          db.CSVSkus.insertMany(separate).then(function(){
            console.clear();
            console.log(`${j + 1}/1130 inserted`);
          }).catch(function(error){
              res.status(500).send({
                  message: "failure separate",
                  error
              });
          });
        }
        console.log(army.length);
        db.CSVSkus.insertMany(army).then(function(){
            res.status(200).send({
                message: "Successfully Uploaded!"
            });
        }).catch(function(error){
            res.status(500).send({
                message: "failure",
                error
            });
        });
    }).catch((error) => {
        res.status(500).send({
            message: "failure",
            error
        });
    })
})

// id,productId,name,sale_price,original_price,default_style
app.post('/styles', (req, res) => {
  csv()
    .fromFile('./data/styles.csv')
    .then((jsonObj)=>{
        var army = [];
        for(var i = 0;i < jsonObj.length; i++){
          console.clear();
          console.log(jsonObj.length, i);
            var obj={};
            obj.id=jsonObj[i]['id'];
            obj.product_id=jsonObj[i]['productId'];
            obj.name=jsonObj[i]['name'];
            obj.sale_price=jsonObj[i]['sale_price'];
            obj.original_price=jsonObj[i]['original_price'];
            obj.default_style=jsonObj[i]['default_style'];
            army.push(obj);
        }
        db.CSVStyles.insertMany(army).then(function(){
            res.status(200).send({
                message: "Successfully Uploaded!"
            });
        }).catch(function(error){
            res.status(500).send({
                message: "failure",
                error
            });
        });
    }).catch((error) => {
        res.status(500).send({
            message: "failure",
            error
        });
    })
})

/**********Transformation**********/

app.get('/transform', (req, res) => {
  let findAll = (query, page) => {
    return db.finalProducts.find()
      .exec();
  };
  findAll()
    .then((obj) => {
      res.status(200).send(obj);
    })
    .catch((err) => {
      res.status(401).send(err);
    })
})

app.delete('/transform', (req, res) => {
  db.finalProducts.deleteMany({})
  .then(function(){
    res.status(200).send({
        message: "Successfully Deleted!"
    });
  }).catch(function(error){
    res.status(500).send({
        message: "failure",
        error
    });
  });
})

app.post('/transform', (req, res) => {
  db.productBy()
    .then((products) => {
      var army = [];
      products.forEach((product) => {
        var obj = {};
        obj.id = product.id;
        obj.name = product.name;
        obj.slogan = product.slogan;
        obj.description = product.description;
        obj.category = product.category;
        obj.default_price = product.default_price;

        army.push(obj);
      });
      return army;
    })
    .then((army) => {
      army.forEach((obj) => {
        var product_id = product.id;
        db.featuresBy(product_id)
          .then((features) => {
            obj.features = features;
          })
      });
      return army;
    })
    .then((army) => {
      army.forEach((obj) => {
        var product_id = product.id;
        db.relatedBy(product_id)
          .then((related) => {
            var relatarr = [];
            related.forEach((eachId) => {
              relatarr.push(eachId.related_product_id);
            })
            obj.related = relatarr;
          })
      });
      return army;
    })
    .then((army) => {
      console.log(army);
      db.finalProducts.insertMany(army).then(function(){
        res.status(200).send({
            message: "Successfully Uploaded!"
        });
      }).catch(function(error){
        res.status(500).send({
            message: "failure",
            error
        });
      });
    })


      // console.log(army);
/*
      .then((data) => {

      })
      .catch((error) => {
        res.status(500).send({
          message: "failure",
          error
        });
      });
*/
      // db.finalProducts.insertMany(army).then(function(){
      //   res.status(200).send({
      //       message: "Successfully Uploaded!"
      //   });
      // }).catch(function(error){
      //   res.status(500).send({
      //       message: "failure",
      //       error
      //   });
      // });
    .catch((error) => {
      res.status(500).send(error);
    });

})

var port = process.env.PORT || 3000;
app.listen(port, err => {
  if (err)
      throw err
  console.log(`listening on port ${port}`);
});