const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/users');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./config/authentication');
const Topic = require('./models/topic');
const port = 3000;
const Question = require('./models/questions'); 
const Experience = require('./models/experience');
const app = express();
const db = require('./config/middleware');


app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
//app.use('/admin',adminRouter);

app.set('view engine','ejs');
app.use(express.urlencoded({ extended : true}));

app.use(express.static(__dirname +'./public/'));
app.get('*',checkUser);



app.listen(port, function(err){
  if (err){
      console.log(`Error in running the server: ${err}`);
  }

  console.log(`Server is running on port: ${port}`);
});




//for displaying images

var data ;
var getdocument = async () => {
      const result = await Experience.find({});
      data = result;
}

 getdocument();

 app.get('*', checkUser);
 app.get('/',requireAuth, (req, res) => res.render('home'));

app.get('/topic/:name',async (req, res) => {

const a = req.params.name;
var topic = await Topic.find({  topic : a });
console.log(topic);
var id = topic[0]._id;
console.log( id );
console.log("alia bhatt");
const question = Question.find({ topic : id })
.then(result => {
  res.render('question',{ b : result });
})
.catch((err)=>{
   console.log(err);
});
}); 

app.use(authRoutes);

app.get('/experiences',(req, res) => { res.locals.data = data ;console.log(data);res.render('company')});

app.get('/experiences/:name',async (req, res) => {

  const a = req.params.name;
  var company = await Company.find({  name : a });
  console.log(company);
  var id = company[0]._id;
  console.log( id );
  console.log("alia bhatt");
  const experience = await Experience.find({ company : id })
  .then(result => {
    console.log(result);
    res.render('experience',{ b : result });
  })
  .catch((err)=>{
     console.log(err);
  });
  
  }); 