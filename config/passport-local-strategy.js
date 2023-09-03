const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

// Authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    function(email, password, done){
        // find a user and estblish the identity
        User.findOne({
            email: email,
        }).then(function(user){
            if(!user || user.password != password){
                console.log('Invalid Username/Password');
                return done(null, false);
            }
            return done(null, user);
        }).catch(function(err){
            if(err){
                console.log(`Error in finding user --> Passport :: ${err}`);
                return done(err);
            }
        })
    }
));


// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done (null, user.id);
});


// deserializing the user form the key in the cookies.
passport.deserializeUser(function(id, done){
    User.findById(id).then(function(user){
        return done(null, user);
    }).catch(function(err){
        if(err){
            console.log(`Error in finding user --> Passport :: ${err}`);
            return done(err);
        }
    })
})


// check if the user is authenticated.
passport.checkAuthentication = function(req, res, next){
    // if the user is signed in, then pass on the request to the nesxt finction (controller's action)
    if(req.isAuthenticated()){
        return next();
    }
    // if the user is not signed in
    return  res.redirect('/users/sign-in')
};

// 
passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        // req.user contains the current signed in user frm the session cookie and we asre just sending this to locals for the views.
        res.locals.user = req.user;
    }
}


module.exports = passport;