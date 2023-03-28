require("dotenv").config();
var express = require('express')
var multer = require('multer')
var mongoose = require('mongoose')
var path = require('path')
var bodyParser = require('body-parser')
var csv = require('csvtojson')
var db = require('../../database/index.js');
var Promise = require('bluebird');
var PromisePool = require('es6-promise-pool')

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

app.get('/transform/all', (req, res) => {
  db.finalProducts
    .find()
    .limit(1)
    .exec()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(401).send(err);
    });

})

app.delete('/transform/all', (req, res) => {
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

app.post('/transform/related', async (req, res) => {
  const army = [];
  for (var i = 452701; i <= 1000011; i ++) {
    console.clear();
    console.log(`now: ${i} / 1000011`);
    const transRelated = await db.CSVRelated.aggregate([
      { $match: {current_product_id : i}},
      { $sort: {id: 1}},
      { $project: { '_id': 0, 'id': 0, 'current_product_id': 0, '__v': 0}},
    ]);
      await Promise.all([transRelated]).then(async (data) => {
        const related = [];
        for (var j = 0; j < data[0].length; j ++) {
          related.push(data[0][j].related_product_id);
        }
        var obj = {};
        obj.id = i;
        obj.related = related;
        army.push(obj);
      });
  }
  for (var i = 0; i < army.length; i ++) {
    const updateRelated = await db.finalProducts.findOneAndUpdate(
      {id: army[i].id},
      {related: army[i].related},
      {
        upsert: true }
    )
    .then(() => {
      console.clear();
      console.log(`update: ${army[i].id} / 1000011`);
    });
  }

  res.sendStatus(200);
})


/**************************** */
app.post('/transform/all', async (req, res) => {
  //1000011
  for (var i = 1; i <= 1000011; i ++) {
    const transProduct = await db.CSVProduct.aggregate([
      { $match: {id : i}},
      { $project: { '_id': 0, '__v': 0}},
    ]);
    const transFeatures = await db.CSVFeatures.aggregate([
      { $match: {product_id : i}},
      { $sort: {id: 1}},
      { $project: { '_id': 0, 'id': 0, 'product_id': 0, '__v': 0}},
    ]);
    const transStyles = await db.CSVStyles.aggregate([
      { $match: {productId : i}},
      { $sort: {style_id: 1}},
      { $project: { '_id': 0, 'productId': 0}},
    ]);
    await Promise.all([transProduct, transFeatures, transStyles]).then(async (data) => {
      const product = data[0][0];
      const features = data[1];
      const styles = data[2];

      var obj = {};

      obj.id = product.id;
      obj.name = product.name;
      obj.slogan = product.slogan;
      obj.description = product.description;
      obj.category = product.category;
      obj.default_price = product.default_price;
      obj.features = features;
      obj.styles = [];

      const styleStart = data[2][0] ? data[2][0].style_id : null;
      const styleEnd = styleStart + data[2].length;

      if (styleStart) {
        for (var j = 0; j < styles.length; j ++) {

          var style = {};

          style.style_id=styles[j]['style_id'];
          style.productId=styles[j]['productId'];
          style.name=styles[j]['name'];
          style.sale_price=styles[j]['sale_price'];
          style.original_price=styles[j]['original_price'];
          style["default?"]=styles[j]['default?']
          style.photos=[];
          style.skus={};

          const transPhotos = await db.CSVPhotos.aggregate([
            { $match: {styleId : styles[j].style_id}},
            { $sort: {id: 1}},
            { $project: { '_id': 0, 'id': 0, '__v': 0, 'styleId': 0}},
          ]);

          const transSkus = await db.CSVSkus.aggregate([
            { $match: {styleId : styles[j].style_id}},
            { $sort: {id: 1}},
            { $project: { '_id': 0, '__v': 0, 'styleId': 0}},
          ]);

          await Promise.all([transPhotos, transSkus]).then((data) => {
            const photos = data[0];
            const skus = data[1];

            skus.forEach((sku) => {
              style.skus[sku.id] = {
                size: sku.size,
                quantity: sku.quantity
              }
            });

            photos.forEach((photo) => {
              style.photos.push(photo);
            });
          })

          obj.styles.push(style);
        }
      }
      db.finalProducts.create({
        id: obj.id,
        name: obj.name,
        slogan: obj.slogan,
        description: obj.description,
        category: obj.category,
        default_price: obj.default_price || null,
        features: obj.features.length ? obj.features : [],
        styles: obj.styles.length? obj.styles : [],
      })
    })
  }

  res.sendStatus(200);
})

var port = process.env.PORT || 3000;
app.listen(port, err => {
  if (err)
      throw err
  console.log(`listening on port ${port}`);
});