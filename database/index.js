require("dotenv").config();
const mongoose = require('mongoose');
mongoose.connect(`mongodb://localhost/${process.env.DB_NAME}`);

//id,name,slogan,description,category,default_price
let csvProductSchema = mongoose.Schema({
  id: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: Number
});

//id,current_product_id,related_product_id
let csvRelatedSchema = mongoose.Schema({
  id: Number,
  current_product_id: Number,
  related_product_id: Number
});

//id,product_id,feature,value
let csvFeaturesSchema = mongoose.Schema({
  id: Number,
  product_id: Number,
  feature: String,
  value: String
});

//id,productId,name,sale_price,original_price,default_style
let csvStylesSchema = mongoose.Schema({
  id: Number,
  product_id: Number,
  name: String,
  sale_price: String,
  original_price: String,
  default_style: String
});

//id,styleId,size,quantity
let csvSkusSchema = mongoose.Schema({
  id: Number,
  styleId: Number,
  size: String,
  quantity: Number
});

//id,styleId,url,thumbnail_url
let csvPhotosSchema = mongoose.Schema({
  id: Number,
  styleId: Number,
  url: String,
  thumbnail_url: String
});



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

let skusSchema = mongoose.Schema({
  id: Number,
  quantity: Number,
  size: String
});

let stylesSchema = mongoose.Schema({
  style_id: Number,
  name: String,
  original_price: String,
  sale_price: String,
  default: Boolean,
  photos: [photosSchema],
  skus: [skusSchema]
});

let productsSchema = mongoose.Schema({
  id: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String,
  features: [featuresSchema],
  related:[Number]
});


let CSVProduct = mongoose.model('Product', csvProductSchema);
let CSVRelated = mongoose.model('Related', csvRelatedSchema);
let CSVFeatures = mongoose.model('Features', csvFeaturesSchema);
let CSVStyles = mongoose.model('Styles', csvStylesSchema);
let CSVSkus = mongoose.model('Skus', csvSkusSchema);
let CSVPhotos = mongoose.model('Photos', csvPhotosSchema);
let finalProducts = mongoose.model('Final', productsSchema);


// let save = (word) => {
//   return Word.findOneAndUpdate(
//     {word: word.word},
//     {
//       word: word.word,
//       definition: word.definition
//     },
//     {
//       new: true,
//       upsert: true }
//   );
// }

// let edit = (word) => {
//   return Word.findOneAndUpdate(
//     {_id: word._id},
//     {
//       word: word.word,
//       definition: word.definition
//     },
//     {
//       new: true,
//       upsert: true }
//   );
// }

let productBy = () => {
  return CSVProduct.find()
    .limit(2)
    .sort({id: 1})
    .exec();
};

let featuresBy = (query) => {
  return CSVFeatures.find({"product_id": query}, { '_id': 0, 'id': 0, 'product_id': 0, '__v': 0})
  .sort({id: 1})
  .exec();
}

let photosBy = (query) => {
  return CSVPhotos.find({"styleId": query},  { '_id': 0, 'id': 0, 'styleId': 0, '__v': 0})
  .sort({id: 1})
  .exec();
}

let skusBy = (query) => {
  return CSVSkus.find({"styleId": query}, { '_id': 0, 'styleId': 0, '__v': 0})
  .sort({id: 1})
  .exec();
}

let stylesBy = (query) => {
  return CSVStyles.find({"product_id": query}, { '_id': 0, 'product_id': 0, '__v': 0})//{"product_id": query}
  .sort({id: 1})
  .exec();
}

let relatedBy = (query) => {
  return CSVRelated.find({"current_product_id": query}, { '_id': 0, 'current_product_id': 0, 'id': 0, '__v': 0})
  .sort({id: 1})
  .exec();
}

// let find = (query, page) => {
//   return Word.find({ "word" : { $regex: query, $options: 'i' }}, null, { skip: page })
//     .limit(10)
//     .sort( {date: -1})
//     .exec();
// };

// let deleteOne = (id) => {
//   return Word.deleteOne({_id: id._id});
// }

// let findAll = (query, page) => {
//   return Word.find()
//     .sort( {date: -1})
//     .exec();
// };

module.exports.CSVProduct = CSVProduct;
module.exports.CSVRelated = CSVRelated;
module.exports.CSVFeatures = CSVFeatures;
module.exports.CSVStyles = CSVStyles;
module.exports.CSVSkus = CSVSkus;
module.exports.CSVPhotos = CSVPhotos;
module.exports.productBy = productBy;
module.exports.featuresBy = featuresBy;
module.exports.photosBy = photosBy;
module.exports.skusBy = skusBy;
module.exports.stylesBy = stylesBy;
module.exports.relatedBy = relatedBy;
module.exports.finalProducts = finalProducts;