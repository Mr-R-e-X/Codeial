const Post = require('../models/post');

module.exports.create = function(req, res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    }).then(function(post){

    }).catch(function(err){
        if(err){ console.log(`Error to Create Post :: ${err}`); return };
        return res.redirect('back')
    })
}