const Post = require('../models/post');

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
    Post.find({}).populate('user').exec().then(function(posts){
        return res.render('home', {
            title: 'Codeial |::| Home',
            posts: posts,
        })
    }).catch(function(err){
        if(err){
            console.log(`Error loading the Posts :: ${err}`);
            return;
        }
    });  
}
