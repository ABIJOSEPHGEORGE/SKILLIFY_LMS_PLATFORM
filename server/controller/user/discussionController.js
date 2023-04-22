const Discussion = require("../../models/discussionSchema");
const User = require("../../models/userSchema");
const { error, success } = require("../../responseApi")

module.exports = {
    createMessage:async(req,res)=>{
        try{
            //getting the user detail
            const user = await User.findOne({email:req.user});
            //creatin the message
            const message = {
                message : req.body,
                student_id:user._id,
                createdAt:new Date(),
            }
            await Discussion.findOneAndUpdate({course_id:req.params.id},{$push:{messages:message},$addToSet:{students:user._id}});
            res.status(201).json(success("OK"));
        }catch(err){
            res.status(500).json(error("Something wen't wrong Please try again later"));
        }
    },
    socketioConnection:(io)=>{
        io.on("connection",(socket)=>{
            console.log('A new user connected')

            socket.on("discussion",(data)=>{
                console.log(data);
            })
        })
    }
}