const express = require('express');
const router = express.Router();
const Room = require('../models/roomModel');
const authorization = require('../middleware/authorization');

// Route to get the history of rooms
router.get('/', authorization, async (req, res, next) => {
    try {
        const roomsCreated = await Room.find({ isActive: false, host: req.user }).populate('host', 'fullName email').populate('chat').populate('joinedUser', 'fullName email');
        const roomsJoined = await Room.find({ isActive: false, joinedUser:  req.user  }).populate('host', 'fullName email').populate('chat').populate('joinedUser', 'fullName email');
        // console.log(roomsCreated, roomsJoined);
        res.status(200).json({ roomsCreated, roomsJoined });
    } catch (error) {
        next(error);
    }
});

//showing white board route
router.get('/:id', authorization, async(req,res,next)=>{
    try{
        const {id} = req.params;
        const roomExist = await Room.findOne({isActive:false, roomId:id}).populate('chat');
        // console.log(roomExist);
        res.status(200).json({objectData: roomExist});
    }catch(err){
        console.log(err);
        res.status(500).json({msg: err});
    }
})




module.exports = router;