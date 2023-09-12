const User = require('../models/user');


module.exports.profile = function(req, res){
    User.findById(req.params.id).then(function(user){
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        });
    }).catch(function(err){
        console.log(`ERROR ===> ${err}`);
        return res.redirect('back');
    });
}

module.exports.update = function(req, res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body).then(function(user){
            return res.redirect('back');
        }).catch(function(err){
            console.log(`ERROR ===> Updating Profile ==> ${err}`);
            return res.redirect('back');
        })
    }else{
        return res.status(401).send('Unauthorized');
    }
}

// render the sign up page
module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up', {
        title: "Codeial || Sign Up"
    });
}

// render the sign in page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

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


// using passport for sign in and create a session 
module.exports.createSession = function(req, res){
    return res.redirect('/');
};


module.exports.destroySession = function(req, res, next){
    req.logout(function(err){
        if(err){
            return next(err);
        }
        return res.redirect('/');
    });
}