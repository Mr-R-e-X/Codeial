module.exports.index = function(req, res){
    return res.json(200, {
        message: " List of Posts ",
        name: " Rex is editing ",
        posts: []
    })
}