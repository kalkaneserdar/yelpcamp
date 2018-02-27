var express                 = require("express"),
    app                     = express(),
    bodyParser              = require("body-parser"),
    mongoose                = require("mongoose"),
    campground              = require("./models/campground"),
    comment                 = require("./models/comment"),
    seedDB                  = require("./seeds"),
    expressSession          = require("express-session"),
    passport                = require("passport"),
    localStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    User                    = require("./models/user"),
    methodOverride          = require("method-override"),
    flash                   = require("connect-flash");
    
//ROUTES INCLUSION
const   campgroundRoutes    = require("./routes/campgroundRoutes"),
        commentRoutes       = require("./routes/commentRoutes"),
        indexRoutes         = require("./routes/indexRoutes");

// mongoose.connect("mongodb://localhost/yelpcamp", {useMongoClient: true});
// mongoose.connect("mongodb://yelpcamp_expressapp:123456@ds151348.mlab.com:51348/yelpcamp");

mongoose.connect(process.env.DATABASEURL);

//seedDB();

//PASSPORT CONFIGURATION
app.use(expressSession({
    secret: "Secret",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(flash());

//ADD CURRENTUSER INFO TO EACH ROUTE VIA CURRENTUSERFUNC CALLBACK
app.use(currentUserFunc);
app.use(function(req, res, next){
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

//APP CONFIGURATION
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

//ROUTES USAGE
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use(indexRoutes);

function currentUserFunc(req, res, next){
    
    res.locals.currentUser = req.user;
    next();
}

app.listen(process.env.PORT, process.env.IP, function(){
    
    console.log("YelpCamp app has initialized..");
});