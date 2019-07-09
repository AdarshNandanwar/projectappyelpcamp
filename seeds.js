var mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment");

var data = [
    {
        name: "The underwoods",
        image: "https://images.pexels.com/photos/2376997/pexels-photo-2376997.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        description: "Nulla pharetra tempus convallis. Suspendisse condimentum dictum eros vitae molestie. Donec placerat turpis id lorem condimentum posuere. Proin tortor tortor, blandit eget egestas laoreet, tempor feugiat neque. Nunc eget consectetur purus, nec elementum orci. Ut porttitor volutpat urna nec tempor. Nam semper fringilla tempor. Proin et tincidunt urna. Nulla ut congue elit. Ut nisi metus, pharetra nec fringilla in, elementum at mauris. Curabitur ac dui leo. Vestibulum sollicitudin tempor dictum. Nam rutrum mauris ac cursus varius. Duis sit amet purus eu neque varius efficitur non eget massa."
    },
    {
        name: "Riverside Tent",
        image: "https://visitrainier.com/wp-content/uploads/2014/02/Camping-at-White-River-Campground-e1527786151787.jpg",
        description: "Mauris sed diam et dui placerat ultrices. Maecenas efficitur orci ac dignissim porttitor. Sed et rhoncus nunc. Etiam dolor erat, viverra id arcu quis, porta venenatis dolor. Praesent eu commodo lacus. Suspendisse semper, velit nec luctus facilisis, metus urna dignissim nibh, dignissim rhoncus quam eros vel sem. Integer aliquam congue nisi id aliquet. Aliquam sagittis faucibus ultricies. Quisque placerat, lorem eu fringilla efficitur, dolor eros tristique augue, quis iaculis nibh dolor ac nulla. In et lorem eget mi imperdiet ullamcorper. Integer fringilla augue vitae dolor dignissim, in hendrerit urna laoreet."
    },
    {
        name: "Mountain View",
        image: "https://images.pexels.com/photos/558454/pexels-photo-558454.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
        description: "Duis aliquet eu odio vehicula mattis. Sed dictum, mi nec viverra elementum, tellus risus condimentum risus, et molestie nisl nunc vitae metus. Suspendisse porttitor in libero a auctor. Proin dignissim consequat metus, in efficitur lorem vulputate non. In hendrerit, tellus vitae hendrerit dapibus, ipsum velit dictum velit, vitae luctus magna sapien vitae ligula. Vestibulum tempor felis eu efficitur fermentum. Nulla augue dolor, rutrum ac mollis id, blandit condimentum diam. Quisque ut libero diam. Fusce eget vestibulum tellus, a aliquam odio. Vestibulum in fermentum mauris. Suspendisse sit amet nibh nec leo tempus gravida ut id risus. Phasellus et neque placerat, commodo augue quis, tempus ligula."
    }
];

function seedDB(){
    //remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }else{
            console.log("removed campgrounds!");
            //add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    }else{
                        console.log("added a campground");
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                }else{
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("created new comment");
                                }
                            }
                        );
                    }
                });
            });
        }
    });
}

module.exports = seedDB;