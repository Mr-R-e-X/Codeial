const User = require('../models/user');


module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: "User Profile"
    });
}

// render the sign up page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title: "Codeial || Sign Up"
    });
}

// render the sign in page
module.exports.signIn = function(req, res){
    return res.render('user_sign_in', {
        title: "Codeial || Sign In"
    });
}

// get the sign up data
module.exports.create = function(req, res){
    
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({
        email: req.body.email
    }).then(function(user){
        if(!user){
           User.create(req.body).then(function(user){
                return res.redirect('/users/sign-in');
           }).catch(function(err){
                if(err){
                    console.log('Error in finding user in signing up');
                    return;
                }
           })
        }else{
                return res.redirect('back');
            }
    }).catch(function(error){
        if(error){
            console.log('Error in finding user in signing up');
            return;
        }
    })

}


// sign in and create a session for user
module.exports.createSession = function(req, res){
    
}