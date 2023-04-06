require("dotenv").config();
const mongoose = require('mongoose');
mongoose.connect(`mongodb://34.217.211.169/${process.env.DB_NAME}`);

//id,name,slogan,description,category,default_price
// let csvProductSchema = mongoose.Schema({
//   id: Number,
//   name: String,
//   slogan: String,
//   description: String,
//   category: String,
//   default_price: String
// });

// //id,current_product_id,related_product_id
// let csvRelatedSchema = mongoose.Schema({
//   id: Number,
//   current_product_id: Number,
//   related_product_id: Number
// });

// //id,product_id,feature,value
// let csvFeaturesSchema = mongoose.Schema({
//   id: Number,
//   product_id: Number,
//   feature: String,
//   value: String
// });

// //id,productId,name,sale_price,original_price,default_style
// let csvStylesSchema = mongoose.Schema({
//   "style_id": Number,
//   "productId": Number,
//   "name": String,
//   "sale_price": String,
//   "original_price": String,
//   "default?": Number,

// });

// //id,styleId,size,quantity
// let csvSkusSchema = mongoose.Schema({
//   id: Number,
//   styleId: Number,
//   size: String,
//   quantity: Number
// });

// //id,styleId,url,thumbnail_url
// let csvPhotosSchema = mongoose.Schema({
//   id: Number,
//   styleId: Number,
//   url: String,
//   thumbnail_url: String
// });


/****************************/

// Final Schema Design
let featuresSchema = mongoose.Schema({
  feature: String,
  value: String
});

let photosSchema = mongoose.Schema({
  thumbnail_url: String,
  url: String
});

let finalPhotosSchema = mongoose.Schema({
  styleId: Number,
  photos: [photosSchema]
});

// let skusSchema = mongoose.Schema({
//   id: Number,
//   quantity: Number,
//   size: String
// });

let stylesSchema = mongoose.Schema({
  style_id: Number,
  name: String,
  original_price: String,
  sale_price: String,
  'default?': Boolean,
  photos: [photosSchema],
  skus: Object
});

let productsSchema = mongoose.Schema({
  id: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String,
  features: [featuresSchema],
  styles:[stylesSchema],
  related: [Number]
});


// let CSVProduct = mongoose.model('Product', csvProductSchema);
// let CSVRelated = mongoose.model('Related', csvRelatedSchema);
// let CSVFeatures = mongoose.model('Features', csvFeaturesSchema);
// let CSVStyles = mongoose.model('Styles', csvStylesSchema);
// let CSVSkus = mongoose.model('Skus', csvSkusSchema);
// let CSVPhotos = mongoose.model('Photos', csvPhotosSchema);
let finalProducts = mongoose.model('Final', productsSchema);
// let finalStyles = mongoose.model('finalStyles', stylesSchema);
// let finalPhotos = mongoose.model('finalPhotos', finalPhotosSchema);


// let productBy = () => {
//   return CSVProduct.find()
//     .limit(2)
//     .sort({id: 1})
//     .exec();
// };

// let featuresBy = (query) => {
//   return CSVFeatures.find({"product_id": query}, { '_id': 0, 'id': 0, 'product_id': 0, '__v': 0})
//   .sort({id: 1})
//   .exec();
// }

// let photosBy = (query) => {
//   return CSVPhotos.find({"styleId": query},  { '_id': 0, 'id': 0, 'styleId': 0, '__v': 0})
//   .sort({id: 1})
//   .exec();
// }

// let skusBy = (query) => {
//   return CSVSkus.find({"styleId": query}, { '_id': 0, 'styleId': 0, '__v': 0})
//   .sort({id: 1})
//   .exec();
// }

// let stylesBy = (query) => {
//   return CSVStyles.find({"product_id": query}, { '_id': 0, 'product_id': 0, '__v': 0})//{"product_id": query}
//   .sort({id: 1})
//   .exec();
// }

// let relatedBy = (query) => {
//   return CSVRelated.find({"current_product_id": query}, { '_id': 0, 'current_product_id': 0, 'id': 0, '__v': 0})
//   .sort({id: 1})
//   .exec();
// }


/**********API Helper Functions*****************/
// List Products
let list = (page = 1, count = 5) => {
  return finalProducts.find({}, { '_id': 0, '__v': 0, 'styles': 0, 'related': 0, 'features': 0})
    .skip((page - 1) * count)
    .limit(count)
    .sort({id: 1})
    .exec();
};
// Product Information
let information = (id) => {
  return finalProducts.findOne({id: id}, { '_id': 0, '__v': 0, 'styles': 0, 'related': 0, 'features._id': 0})
    .exec();
}
// Product Styles
let styles = (id) => {
  return finalProducts.findOne({id: id}, { '_id': 0, '__v': 0, 'styles._id': 0, 'related': 0, 'features': 0,
  'name' : 0, 'slogan' : 0, 'description' : 0, 'category' : 0, 'default_price' : 0, 'styles.photos._id': 0})
    .exec();
}
// Product Related
let related = (id) => {
  return finalProducts.findOne({id: id}, { '_id': 0, '__v': 0, 'styles': 0, 'features': 0,
  'name' : 0, 'slogan' : 0, 'description' : 0, 'category' : 0, 'default_price' : 0})
    .exec();
}

// module.exports.CSVProduct = CSVProduct;
// module.exports.CSVRelated = CSVRelated;
// module.exports.CSVFeatures = CSVFeatures;
// module.exports.CSVStyles = CSVStyles;
// module.exports.CSVSkus = CSVSkus;
// module.exports.CSVPhotos = CSVPhotos;

// module.exports.productBy = productBy;
// module.exports.featuresBy = featuresBy;
// module.exports.photosBy = photosBy;
// module.exports.skusBy = skusBy;
// module.exports.stylesBy = stylesBy;
// module.exports.relatedBy = relatedBy;
module.exports.finalProducts = finalProducts;
// module.exports.finalStyles = finalStyles;

module.exports.list = list;
module.exports.related = related;
module.exports.styles = styles;
module.exports.information = information;

