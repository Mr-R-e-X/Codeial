const Post = require('../models/post');
const User = require('../models/user');
module.exports.home = function(req, res){
    // console.log(req.cookies);
    // res.cookie('user_id', 25);

    // Post.find({}).then(function(posts){
    //     return res.render('home', {
    //         title: 'Codeial |::| Home',
    //         posts: posts,
    //     })
    // }).catch(function(err){
    //     if(err){
    //         console.log(`Error loading the Posts :: ${err}`);
    //         return;
    //     }
    // });
    Post.find({}).populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec().then(function(posts){
        User.find().then(function(user){
            return res.render('home', {
                title: 'Codeial |::| Home',
                posts: posts,
                all_users: user           
            })
        }).catch(function(err){
            console.log(`ERROR ===> ${err}`);
            return;
        })
        
    }).catch(function(err){
        if(err){
            console.log(`Error loading the Posts :: ${err}`);
            return;
        }
    });  
}
