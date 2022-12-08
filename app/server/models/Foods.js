const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const FoodsSchema = new mongoose.Schema({
  Name: {
    type: String,
  },
  Calories: {
    type: Number,
  },
  Carbohydrate: {
    type: Number,
  },
  Fat: {
    type: Number,
  },
  Protein: {
    type: Number,
  },
  Saturated_fatty_acids: {
    type: Number,
  },
  Sodium: {
    type: Number,
  },
  Fatty_acids_total_trans: {
    type: Number,
  },
  Category: {
    type: String,
  },
  cluster: {
    type: Number,
  },
  Cohort: {
    type: String,
  },
});

module.exports = mongoose.model('Foods', FoodsSchema);
