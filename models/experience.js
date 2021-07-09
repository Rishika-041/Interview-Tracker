const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 

const experienceSchema = new Schema({
  name : {
    type : String,
    required : true
  },
  image : {
    type : String,
    required : true 
  },
  year : {
   type : Number,
   required : true
  },
  branch : {
    type : String,
    required : true
  },
  company : { 
      type : Schema.Types.ObjectId,
      ref : 'companys',
      required : true 
  },
  exp : {
      type : String,
      required : true
  }
});

const Experience = mongoose.model('experience', experienceSchema);

module.exports = Experience;
