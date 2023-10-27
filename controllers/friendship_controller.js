const Friendship = require("../models/friendship");
const User = require("../models/user");

module.exports.sendFrndReq = async (req, res) => {

    try {
       const fromUserId = req.query.luid;
       const toUserId = req.query.uid;
       let user1 = await User.findById(fromUserId);
       let user2 = await User.findById(toUserId);
       let requestSent = false;
// Checking if already friends
       let existingFriendShip =  await Friendship.findOne({
            $or: [
                {from_user: fromUserId, to_user: toUserId},
                {from_user: toUserId, to_user: fromUserId}
            ]
       });

       if(existingFriendShip){
            requestSent = true;
            await user1.friendships.pull(existingFriendShip.id);
            await user2.friendships.pull(existingFriendShip.id);
            await Friendship.deleteOne(existingFriendShip); 
            res.status(200).json({
                error: "Friendship request removed",
            })
            return res.redirect('back');
       };
// Creating a new Friendship reqest
       const newFriendship = new Friendship({
            from_user: fromUserId,
            to_user: toUserId,
       });
       await newFriendship.save();
       user1.friendships.push(newFriendship.id);
       user2.friendships.push(newFriendship.id);
       await user1.save();
       await user2.save();
       res.status(200).json({
        message: " Friend Request send successfully!!! "
       })
    //    req.flash("success", "Friend Request Sent Successfully");
    //    return res.redirect('back');

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: " An Error Occured while sending the friend requst!!! "
        })
    }

}

module.exports.acceptFrndReq = async (req, res) => {

    const frndReqId = req.params.id;
    const userId = req.user.id;
    try {
        const frndship = await Friendship.findById(frndReqId);

        if(!frndship){
            return res.status(404).json({
                message: "Request not found",
            })
        }

        //checking the logged in user is the "to_User" (the one receiving the request);
        if(String(frndship.to_user) !== String(userId)){
            return res.status(403).json({
                message: "You are not allowed to accept!"
            })
        }
        //Updating the friendship status
        frndship.status = 'accepted';

        await frndship.save();


        await User.updateOne(
            {friendships: frndship._id},
        )

        return res.status(200).json({
            message: "Friend Request Accepted",
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
        })
    }
}