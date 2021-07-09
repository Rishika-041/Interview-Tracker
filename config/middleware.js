

const mongoose = require('mongoose');
const dburl = 'mongodb+srv://rishika:rishika@rishika.c9r6s.mongodb.net/rishika?retryWrites=true&w=majority';
mongoose.connect(dburl,{ useNewUrlParser: true },{ useUnifiedTopology: true }  )
const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;