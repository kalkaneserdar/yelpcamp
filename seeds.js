var mongoose    = require("mongoose"),
    campground  = require("./models/campground"),
    comment     = require("./models/comment"),
    campgroundsData =             
    [
        {
            name: "Awesome Seed Camp1",
            photo: "https://cdn1.acsi.eu/5/6/7/2/5672135157c86.jpeg",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        {
            name: "Another Awesome Seed Camp2",
            photo: "http://www.freibeuter-reisen.org/wp-content/uploads/2014/04/Bled-Slowenien-Camping.jpg",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        {
            name: "And the last Awesome Seed Camp3",
            photo: "http://www.johns-bavarian-tours.com/uploads/tx_templavoila/koenigssee-bartholomae.jpg",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        }
    ];
    
function seedDB(){
    //Remove Campgrounds and Comments
    campground.remove({}, function(err, responseData){
       if(err){
           console.log("SOMETHING WENT WRONG WHILE REMOVING CAMPGROUND RECORDS!");
           console.log(err);
       }
       else {
    //       comment.remove({}, function(err, responseData){
    //       if(err){
    //           console.log("SOMETHING WENT WRONG WHILE REMOVING COMMENT RECORDS!");
    //           console.log(err);
    //       }    
    //         else {
    //             console.log("All records in Campground and Comment collections are removed");
    //         }   
    //     });
    // //Add a few campgrounds
    //       campgroundsData.forEach(function(campgroundsDataItem, index){
    //           campground.create(campgroundsDataItem, function(err, campgroundSeedRecord){
    //             if(err){
    //                 console.log(err);
    //             }
    //             else {
    //                 console.log("Seed record " + index + " is created!");
    // //Add a few comments                
    //                 comment.create({
    //                     text: "This is a comment!! " + index,
    //                     author: "Commentator"
    //                     }, function(err, comment){
    //                         if(err){
    //                             console.log(err);
    //                         }
    //                         else {
    //                             campgroundSeedRecord.comments.push(comment._id);
    //                             campgroundSeedRecord.save();
    //                             console.log("A new comment added to Campground Seed record!");
    //                         }
    //                     });
    //                 }
    //             });
    //         });
        }
    });
}

module.exports = seedDB;