var campground  = require("../models/campground"),
    comment     = require("../models/comment");

var middlewareObj = {};

//AUTHENTICATION MIDDLEWARE
middlewareObj.isLoggedIn = function(req, res, next){
    
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "PLEASE LOGIN FIRST!");
    res.redirect("/login");
};

//AUTHORIZATION MIDDLEWARE
middlewareObj.isAuthorizedCampgroundManipulation = function(req, res, next){
    
    if(req.isAuthenticated()){
        
        campground.findById({"_id" : req.params.id}, function(err, responseCampground){
           
            if(err){
                
                console.log("SOMETHING WENT WRONG!: Read from campground collection via findById method while trying to edit campground is unsuccesful.");
                console.log(err);
            } 
            else {
                
                if(!(req.user)){
                    
                    console.log("NOT A VALID USER!");
                    req.flash("error", "NOT A VALID USER!");
                    res.redirect("back");
                }
                else {
                    
                    if(responseCampground.createdBy.id.toString() === req.user._id.toString()) {
                        
                        return next();
                    }
                    else {
                        
                        console.log("USER NOT AUTHORIZED!");
                        console.log(req.header("Referer"));
                        req.flash("error", "YOU ARE NOT AUTHORIZED TO DO THAT!");
                        res.redirect("back");
                    }
                }    
            }
        });
    } 
    else {
        
        console.log("USER NOT AUTHENTICATED!");
        req.flash("error", "PLEASE LOGIN FIRST!");
        res.redirect("back");
    }
};

//AUTHORIZATION MIDDLEWARE
middlewareObj.isAuthorizedCommentManipulation = function(req, res, next){
    
    if(req.isAuthenticated()){
        
        comment.findById({"_id" : req.params.comment_id}, function(err, responseComment){
           
            if(err){
                
                console.log("SOMETHING WENT WRONG!: Read from comment collection via findById method while trying to edit campground is unsuccesful.");
                console.log(err);
                res.redirect("back");
            } 
            else {
                
                if(!(req.user)){
                    
                    console.log("NOT A VALID USER!");
                    req.flash("error", "NOT A VALID USER!");
                    res.redirect("back");
                }
                else {
                    
                    if(responseComment.author.id.toString() === req.user._id.toString()) {
                        
                        next();
                    }
                    else {
                        
                        console.log("USER NOT AUTHORIZED!");
                        req.flash("error", "YOU ARE NOT AUTHORIZED TO DO THAT!");
                        res.redirect("back");
                    }
                }    
            }
        });
    } 
    else {
        
        console.log("USER NOT AUTHENTICATED!");
        req.flash("error", "PLEASE LOGIN FIRST!");
        res.redirect("back");
    }
};

module.exports = middlewareObj;