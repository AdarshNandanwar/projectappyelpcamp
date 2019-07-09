var Campground = require("../models/campground");
var Comment = require("../models/comment");

//middlewares
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            //if campground of the given valid id dosen't exist, 
            // mongo will return null which is falsey. Therefore !foundCampground is truthy when foundCampground is null
            if(err || !foundCampground){    
                req.flash("error", "Campground not found");
                res.redirect("back");
            }else{
                //does user own the campground?
                
                //if(foundCampground.author.id === req.user._id)
                //^^^ dosen't work as different datatypes, mongoose makes object and req.user._id is a String
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    }else{
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err || !foundComment){
                req.flash("error", "Comment not found");
                res.redirect("back");
            }else{
                //does user own the comment?
                
                //if(foundComment.author.id === req.user._id)
                //^^^ dosen't work as different datatypes, mongoose makes object and req.user._id is a String
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    }else{
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}

module.exports = middlewareObj;