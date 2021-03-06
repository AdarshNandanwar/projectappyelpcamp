var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");

//ROOT ROUTE
router.get("/", function(req, res){
    res.render("landing");
});

//REGISTER FORM ROUTE
router.get("/register", function(req, res){
    res.render("register", {page: "register"});
});

//SIGNUP LOGIC ROUTE
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    //sign up
    User.register(newUser, req.body.password, function(err, user){
        // if(err){
        //     req.flash("error", err.message);
        //     return res.redirect("/register");
        // }

        //since we are on the same page, we want to use render. So, we use the code below insted of redirect code
        if(err){
            console.log(err);
            return res.render("register", {error: err.message});
        }
        //login
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

//LOGIN ROUTE
router.get("/login", function(req, res){
    res.render("login", {page: "login"});
});

//LOGIN LOGIC ROUTE
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
});

//LOGOUT ROUTE
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/campgrounds");
});

module.exports = router;