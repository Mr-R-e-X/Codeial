const mongoose = require('mongoose');

const friendshipSchema = new mongoose.Schema({
    // the user who sent this
    from_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    // the user who accepted this request
    to_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    status: {
        type: String,
        default: 'pending',
    }
},{
    timestamps: true,
});

const Friendship = mongoose.model('Friendship', friendshipSchema);
module.exports = Friendship;