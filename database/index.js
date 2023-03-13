require("dotenv").config();
const mongoose = require("    ` ");
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





// Final Schema Design
let featuresSchema = mongoose.Schema({
  feature: String,
  value: String
});

let photosSchema = mongoose.Schema({
  url: String,
  thumbnail_url: String
});

let skusSchema = mongoose.Schema({
  id: Number
  size: String,
  quantity: Number
});

let stylesSchema = mongoose.Schema({
  id: Number,
  name: String,
  sale_price: String,
  original_price: String,
  default_style: String,
  photos: [photosSchema],
});


let CSVProduct = mongoose.model('Product', csvProductSchema);
let CSVRelated = mongoose.model('Related', csvRelatedSchema);
let CSVFeatures = mongoose.model('Features', csvFeaturesSchema);
let CSVStyles = mongoose.model('Styles', csvStylesSchema);
let CSVSkus = mongoose.model('Skus', csvSkusSchema);
let CSVPhotos = mongoose.model('Photos', csvPhotosSchema);


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

module.exports.save = save;
module.exports.find = find;
module.exports.edit = edit;
module.exports.deleteOne = deleteOne;
module.exports.findAll = findAll;