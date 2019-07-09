var express         = require('express'),
    app             = express(),
    bodyParser      = require('body-parser'),
    mongoose        = require('mongoose'),
    flash           = require("connect-flash"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    Campground      = require("./models/campground"),
    User            = require("./models/user"),
    Comment         = require("./models/comment"),
    seedDB          = require("./seeds");

//requiring routes
var campgroundRoutes = require("./routes/campgrounds"),
    commentRoutes = require("./routes/comments"),
    indexRoutes = require("./routes/index");

mongoose.connect("mongodb://localhost:27017/yelp_camp_v12", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));     //Adding custom CSS
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();    //seed the database

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Dogs are the best",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//to avoid passing currentUser in every route,
//we use this which calls this function on every single route
//now we can access current user which is logged in in every views.ejs
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    //to avoid passing flash message to every ejs
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);    //to pass the params do this in the comments.js,   var router = express.Router({mergeParams: true});
app.use("/", indexRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});