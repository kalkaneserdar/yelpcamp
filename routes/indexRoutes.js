var express = require("express");
var router = express.Router({mergeParams: true});
var passport = require("passport");
var User = require("../models/user");

//HOME
router.get("/", function(req, res){
    
   res.render("landing"); 
});

//========
//AUTH ROUTES
//========
//REGISTER SHOW ROUTE
router.get("/register", function(req, res){
    
   res.render("register");
});

//REGISTER HANDLER ROUTE
router.post("/register", function(req, res){
    
   User.register(new User({"username" : req.body.username}), req.body.password, function(err, user){
       
       if(err){
           console.log("SOMETHING WENT WRONG!: Write operation via passport Register method while adding new user to the DB is unsuccessful.");
           console.log(err);
           req.flash("error", err.message);
           return res.redirect("/register");
       }
       passport.authenticate("local")(req, res, function(){
           console.log("User successfully created.");
           console.log(user);
           req.flash("success", "User successfully created! Welcome to YelpCamp, " + user.username + "!");
           res.redirect("/campgrounds");
       });
   }); 
});

//LOGIN SHOW ROUTE
router.get("/login", function(req, res){
    
   res.render("login", {message: req.flash("error")});
});

//LOGIN HANDLER ROUTE
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res){
});

//LOGOUT ROUTE
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "You are successfully logged out!")
    res.redirect("/campgrounds");
});

module.exports = router;