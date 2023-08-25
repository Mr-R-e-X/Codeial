module.exports.profile = function(req, res){
    return res.render('home', {
        title: "User Profile"
    });
}