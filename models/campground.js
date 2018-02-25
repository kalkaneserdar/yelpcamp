var mongoose = require("mongoose");
// var comment = require("./comment");

var campgroundSchema = new mongoose.Schema(
    {
        name: String,
        photo: String,
        desc: String,
        price: String,
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "comment"
        }],
        createdBy: 
        {
            id: 
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            username: String
        }
    },
    {usePushEach: true}
);

module.exports = mongoose.model("campground", campgroundSchema);