const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function(req, res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    }).then(function(post){
        console.log(`Success ===> Post Created ${post}`);
        return res.redirect('back');
    }).catch(function(err){
        if(err){ console.log(`Error to Create Post :: ${err}`); return };
        return res.redirect('back')
    })
};

module.exports.destroy = function(req, res){
    Post.findById(req.params.id).then(function(post){
        //.id means converting the object id into string
        if(post.user == req.user.id){
            post.deleteOne();
            Comment.deleteMany({post: req.params.id}).then(function(post){
                console.log(`Successfully deleted the comment :: ${post}`);
                return res.redirect('back');
            }).catch(function(err){
                if(err){
                    console.log(`Error ===> can't delete the comments :: ${err}`);
                    return res.redirect('back');
                }
            })
        }else{
            return res.redirect('back');
        }
    }).catch(function(err){
        if(err){
            console.log(`ERROR ===> ${err}`);
            return res.redirect('back');
        }
    });
};