//const Err = require("../utility/error");
const User = require("../models/users");
const admins = require('../admin');
//const aEH = require("../utility/asyncErrorHandler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
//const sendEmail = require("../utility/sendEmail");
//const multer = require("multer");
//const { ProblemSet } = require("../models/personalProblemSetModel");
const Question = require('../models/questions'); 
const Experience = require('../models/experience');




const requireAuth = (req,res,next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'net ninja secret', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
};




// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'net ninja secret', async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      } 
    });
  } else {
    res.locals.user = null;
    next();
  }
};

//admin auth

const adminAuth = (req, res, next) => {
  console.log("kenny");
  const token = req.cookies.jwt;
  console.log(token)
  //check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'net ninja secret', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        console.log(res.locals.user);
        let swag = admins();
      
        var a = 0;
        swag.forEach(element => {
          console.log("hi");
          console.log(element.email);
           
             if(element.email == res.locals.user.email){
               a=1;
             }
        });

        if(a ==1){

          req.body.approved = true;
          console.log(req.body.approved);
          next();
        }
        else {
          res.redirect('/login');
        }
        
      }
    });
  
}else{
  res.redirect('/login');
    next();
}
};

const adminAuth1 = (req, res, next) => {
  console.log("kenny1");
  const token = req.cookies.jwt;
  console.log(token)
  //check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'net ninja secret', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        console.log(res.locals.user);
        let swag = admins();
      
        var a = 0;
        swag.forEach(element => {
          console.log("hi");
          console.log(element.email);
             if(element.email == res.locals.user.email){
               a=1;
             }
        });

        if(a ==1){

          req.body.approved = true;
          console.log(req.body.approved);
          next();
        }
       else{
         res.redirect('/login');
       }

        
      }
    });
  } else {
    res.redirect('/login');
    next();
  }
};



module.exports = { requireAuth, checkUser, adminAuth};
