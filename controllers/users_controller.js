const User = require('../models/users');
const jwt = require('jsonwebtoken');
const Topic = require('../models/topic');
const Question = require('../models/questions');
const { requireAuth, checkUser } = require('../config/authentication');
const Experience = require('../models/experience');
const dotenv = require('dotenv');
const Company = require('../models/company');

dotenv.config();

const handleErrors = (err) =>{
  console.log(err.message,err.code);
  let errors = { email : '' , password : ''};

       // incorrect email 
  if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered';
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }

  if(err.code === 11000){
    errors.email = "This email is already registered";
    return errors;
  }

  if(err.message.includes('user validation failed')){
    Object.values(err.errors).forEach(({properties}) => {
      errors[properties.path] = properties.message;
    });
    
  }
  return errors;
}

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'net ninja secret', {
    expiresIn: maxAge
  });
}


  module.exports.signup_get = (req, res) => {
    res.render('signup');
  }
  
  module.exports.login_get = (req, res) => {
    res.render('login');
  }
  
  module.exports.signup_post = async (req,res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.create({ email, password });
      const token = createToken(user._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(201).json({ user: user._id });
      
    }
    catch(err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }
   
  }
  
  module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.login(email, password);
      const token = createToken(user._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(200).json({ user: user._id });
      
    } 
    catch (err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }
  
  }
  
  module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '',{ maxAge : 1});
    res.redirect('login');
  };

  module.exports.topic_get = (req, res) => {
    Topic.find({},(err,data)=> {
      if(err){
        console.log(err)
      }else{
        
        res.render('practise',{ topic : data});
      }
    }
    )};

    module.exports.question_get = (req, res) => {
      res.render('addquestion');
   }

     module.exports.question_post = async(req,res) => {
      console.log("alia");
  var x = await Topic.find({ topic : req.body.topic });
  var id = x[0]._id;
  req.body.topic = id;
  console.log(req.body);

  var data = new Question(req.body);
 data.save()
  .then(item => {
    console.log("data is saved");
  })
 .catch(err => {
    console.log(err); 
  })
}

    module.exports.addexperience_get = (req,res) =>{
      res.render('addexperience');
    }
    
    module.exports.addexperience_post = async(req,res) => {
      
     var phew = req.body.company;
     
     console.log(req.body);
      var x = await Company.find({ name : req.body.company });
      console.log(x);    
       var id = x[0]._id;
       req.body.company = id;
      
    
    var data = new Experience(req.body);
     data.save()
      .then(item => {
        console.log("data is saved");
      })
     .catch(err => {
        console.log(err);
      })
    }

