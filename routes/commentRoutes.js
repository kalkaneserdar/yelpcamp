var express     = require("express"),
    router      = express.Router({mergeParams: true}),
    campground  = require("../models/campground"),
    comment     = require("../models/comment"),
    User        = require("../models/user"),
    middleware  = require("../middleware");

//NEW COMMENT ROUTE - Shows the form to add a new comment
router.get("/new", middleware.isLoggedIn, function(req, res){
   
   campground.findById(req.params.id, function(err, responseData){
       
       if(err){
           console.log("SOMETHING WENT WRONG!: Read from campground collection via findById method while opening new comment route is unsuccessful.");
           console.log(err);
       }
       else {
        //   console.log("THIS IS THE RESPONSE RETRIEVED FROM THE DATABASE WHILE OPENNING NEW COMMENT ROUTE!");
        //   console.log(responseData);
           res.render("comments/new", {campground: responseData});
       }
   });
});

//CREATE COMMENT ROUTE - Adds new comment records to the DB
router.post("/", middleware.isLoggedIn, function(req, res){
    
    campground.findById(req.params.id, function(err, campgroundResp){ //Find the campground that the comment will be added to
        
        if(err){
            
            console.log("SOMETHING WENT WRONG!: Read from campground collection via findById method while adding new comment to the DB is unsuccessful.");
            console.log(err);
        }
        else {
            
            User.findById(res.locals.currentUser._id, function(err, UserResp){ //Find the user by using logged-in user info that will be adding comment
                        
                if(err){
                            
                    console.log(err);
                }
                else {
                            
                    comment.create(
                    {
                       text: req.body.comment.text,
                       author: 
                       {
                           id: UserResp._id,
                           username: UserResp.username
                       }    
                    }, function(err, commentResp){
                    
                        if(err){
                            
                            console.log(err);
                        }
                        else{
                            //ADD USER INFO TO THE COMMENT DOCUMENT
                            console.log(commentResp);
                            campgroundResp.comments.push(commentResp._id);
                            campgroundResp.save(function(err, responseData){
        
                                if(err){
          
                                    console.log(err);
                                }
                                else {
                                
                                    // console.log("THIS IS THE RESPONSE RETRIEVED FROM THE DATABASE WHILE ADDING A NEW COMMENT!");
                                    // console.log(responseData);
                                }
                            });
                        }
                    });
                }
            });
        req.flash("success", "Comment successfully added!");
        res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//EDIT COMMENT
router.get("/:comment_id/edit", middleware.isAuthorizedCommentManipulation, function(req, res){
    
    comment.findById(req.params.comment_id, function(err, commentResponse){
        if(err){
            
            res.redirect("back");
        }
        else {
            
            res.render("comments/edit", {campground_id: req.params.id, comment: commentResponse});    
        }
    });
});

//UPDATE COMMENT
router.put("/:comment_id", middleware.isAuthorizedCommentManipulation, function(req, res){
    
    var commentObj = {text: req.body.comment.text};
    
    comment.findByIdAndUpdate(req.params.comment_id, commentObj, function(err, responseComment){
        
        if(err){
            
            console.log("SOMETHING WENT WRONG!: FindByIdAndRemove method while trying to update comment in DB is unsuccesful.");
            console.log(err);
        }
        else {
            req.flash("success", "Comment succesfully edited!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//DELETE ROUTE
router.delete("/:comment_id", middleware.isAuthorizedCommentManipulation, function(req, res){
    
    comment.findByIdAndRemove(req.params.comment_id, function(err, commentResponse){
        
        if(err){
            
            console.log("SOMETHING WENT WRONG!: FindByIdAndRemove method while trying to delete campground from DB is unsuccesful.");
            console.log(err);
        }
        else {
            console.log(commentResponse);
            req.flash("success", "Comment succesfully deleted!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;