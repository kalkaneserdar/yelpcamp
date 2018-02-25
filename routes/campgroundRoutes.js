var express         = require("express"),
    router          = express.Router(),
    campground      = require("../models/campground"),
    methodOverride  = require("method-override"),
    middleware   = require("../middleware");

var campgrounds = [];

//INDEX ROUTE - Shows all campgrounds
router.get("/", function(req, res){
    
    campgrounds = campground.find({}, function(err, responseData){
    
        if(err){
            console.log("SOMETHING WENT WRONG: DB RETRIEVE");
            console.log(err);
        }
        else {
            campgrounds = responseData;
            // console.log("THIS IS THE CAMPGROUNDS LIST RETRIEVED FROM DB:");
            // console.log(campgrounds);
            res.render("campgrounds/index", {campgrounds: campgrounds});
        }
    });
});

//NEW ROUTE - Shows the form to add a new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
    
    res.render("campgrounds/new");
});

//CREATE ROUTE - Adds new campgrounds to the DB
router.post("/", middleware.isLoggedIn, function(req, res){
 
    campground.create({
        name: req.body.campName,
        photo: req.body.imgUrl,
        desc: req.body.desc,
        price: req.body.price,
        createdBy: 
            {
                id: req.user._id,
                username: req.user.username
            }
        }, function(err, responseData){
            if (err){
                console.log("SOMETHING WENT WRONG: Error in writing 'campground' data into collection");
                console.log(err);
            } else {
                // console.log("A NEW RECORD ADDED TO THE DB!");
                // console.log(responseData);
                req.flash("success", "Campground successfully created!");
                res.redirect("/campgrounds");
            }
    });
});

//SHOW ROUTE - Shows detail page for any campground with the provided id
router.get("/:id", function(req, res){
    
    campground.findById(req.params.id).populate("comments").exec(function(err, responseData){
        
        if(err){
            
            console.log("SOMETHING WENT WRONG!: Read from campground collection via findById method while openning campground detail page is unsuccesful.");
            console.log(err);
        }
        else {
            
            res.render("campgrounds/show", {campground: responseData});
            // console.log("This is show response: " + responseData);
        }
    });
});

//EDIT ROUTE
router.get("/:id/edit", middleware.isAuthorizedCampgroundManipulation, function(req, res){
    
    campground.findById({"_id" : req.params.id}, function(err, responseCampground){
       
        if(err){
            
            console.log("SOMETHING WENT WRONG!: Read from campground collection via findById method while trying to edit campground is unsuccesful.");
            console.log(err);
        } 
        else {
        
            res.render("campgrounds/edit", {campground: responseCampground});
        }
    });
});

//UPDATE ROUTE
router.put("/:id/", middleware.isAuthorizedCampgroundManipulation, function(req, res){
   
    var campObj = {
        name: req.body.campName,
        photo: req.body.imgUrl,
        desc: req.body.desc,
        price: req.body.price,
    };
    
    campground.findByIdAndUpdate(req.params.id, campObj, function(err, responseCampground){
        
        if(err){
            
            console.log("SOMETHING WENT WRONG!: FindByIdAndRemove method while trying to update campground in DB is unsuccesful.");
            console.log(err);
        }
        else {
            
            req.flash("success", "Campground successfully edited!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//DELETE ROUTE
router.delete("/:id/", middleware.isAuthorizedCampgroundManipulation, function(req, res){
    
    campground.findByIdAndRemove(req.params.id, function(err, campgroundResponse){
        
        if(err){
            
            console.log("SOMETHING WENT WRONG!: FindByIdAndRemove method while trying to delete campground from DB is unsuccesful.");
            console.log(err);
        }
        else {
            console.log(campgroundResponse);
            req.flash("success", "Campground successfully deleted!");
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;