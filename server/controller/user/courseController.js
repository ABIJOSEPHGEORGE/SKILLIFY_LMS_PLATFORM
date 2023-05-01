const { default: mongoose } = require("mongoose");
const Course = require("../../models/courseSchema");
const User = require("../../models/userSchema");
const { error, success } = require("../../responseApi");
const { Notes } = require("../../models/noteSchema");
module.exports = {
    getCourses:async(req,res)=>{
        try{
            //configuring filter , sort and pagination
            const category = req.query.category === undefined || req.query.category=== "All" ? {} : { "category.category_name": req.query.category };
            const sub_category = req.query.sub_category === undefined || req.query.sub_category==="All" ? {} : {"sub_category":req.query.sub_category};
            const price = req.query.price === undefined || req.query.price==="All" ? {} : {"isFree":JSON.parse(req.query.price)};
            const searchKey = req.query.search === "null" ? {} : {"course_title" : {$regex:req.query.search,$options: "i"}}
            
            //pagination
            const productPerPage = 5;
            const page = req.query.p??1;

            //sorting
            const sort = parseInt(req.query.sort);
            const status = true;

            const filter = { $and: [category,sub_category,price,searchKey,{status:true}]};

            const courses = await Course.aggregate([
            { $lookup: { from: "categories", localField: "category", foreignField: "_id", as: "category" } },
            { $unwind: "$category" },
            { $match: filter },
            {$skip:(page-1)*productPerPage},
            {$limit:productPerPage},
            {$sort:{"course_sale_price":sort}}
            ]);
            console.log(courses)
            return res.status(200).json(success("OK",{courses:courses,currentPage:page,hasNextPage:productPerPage*page<courses.length,nextPage:parseInt(page)+1,lastPage:Math.ceil(courses.length/productPerPage)}))
        }catch(err){
            console.log(err)
            res.status(500).json(error("Something went wrong, Try after sometimes"))
        }
    },
    singleCourse:async(req,res)=>{
        try{
            const course = await Course.findOne({_id:req.params.id})
            return res.status(200).json(success("OK",course))
        }catch(err){
            res.status(500).json(error("Something went wrong, Try after sometimes"))
        }
    },
    isEnrolled:async(req,res)=>{
        try{
            //finding the user
            const user = await User.findOne({email:req.user});
            //finding the course is enrolled or not
            req.params.id = new mongoose.Types.ObjectId(req.params.id).toString()
            const isEnrolled = user.enrolled_course.find(course=>course.course_id.toString()===req.params.id)
            if(isEnrolled){
                return res.status(200).json(success("OK",true))
            }else{
                return res.status(200).json(success("OK",false))
            }
        }catch(err){
            console.log(err)
            return res.status(500).json(error("Something went wrong"));
        }
    },
    enrolledCourses:async(req,res)=>{
        try{
            //fetching all courses enrolled by user
            const courses = await User.findOne({email:req.user}).populate({path:"enrolled_course.course_id"});
            res.status(200).json(success("OK",courses.enrolled_course))
        }catch(err){
            res.status(500).json(error("Something wen't wrong, Try after sometimes"))
        }
    },
    courseProgress:async(req,res)=>{
        try{
            const completion_status = await User.findOne({email:req.user,enrolled_course:{$elemMatch:{course_id:req.params.id}}})
            .select('enrolled_course.$')
            res.status(200).json(success('OK',completion_status));
        }catch(err){
            res.status(500).json(error("Something wen't wrong, Try after sometimes"))
        }
    },
    updateCourseProgress:async(req,res)=>{
        try{

        }catch(err){
            res.status(500).json(error("Something wen't wrong, Try after sometimes"))
        }
    },
    newCourseNote:async(req,res)=>{
        try{
            const {_id} = await User.findOne({email:req.user})
            const newNote = {
                userId : _id,
                courseId:req.params.id,
                note:req.body.note,
            }
            
            await Notes.create(newNote);
            res.status(200).json(success("OK"));
        }catch(err){
            console.log(err)
            res.status(500).json(error("Something wen't wrong, Try after sometimes"))
        }
    },
    allNotes:async(req,res)=>{
        try{
            const {_id} = await User.findOne({email:req.user});
            const notes = await Notes.find({userId:_id,courseId:req.params.id});
            res.status(200).json(success("OK",notes))
        }catch(err){
            res.status(500).json(error("Something wen't wrong, Try after sometimes"))
        }
    },



    //Course Reviews
    createReview:async(req,res)=>{
        try{
            const {_id,first_name,last_name} = await User.findOne({email:req.user});
            const {desc,rating} = req.body;
            const user_name = `${first_name} ${last_name}`
            const createdAt = new Date();
            await Course.findOneAndUpdate({_id:req.params.id},{$push:{reviews:{userId:_id,user_name:user_name,rating:rating,review:desc,createdAt:createdAt}}});
            res.status(201).json(success("OK"));
        }catch(err){
            res.status(500).json(error("Something wen't wrong, Try after sometimes"))
        }
    },
    allReviews:async(req,res)=>{
        try{
            const {_id,enrolled_course} = await User.findOne({email:req.user});
            const course = await Course.findOne({_id:req.params.id}).select('reviews');
            const totalReviews = course.reviews.length;
            //checking the current user alreay wrote a review
            let isDone = course.reviews.reduce((acc, courseCurr) => {
                const response = enrolled_course.reduce((acc2, userCurr) => {
                  if (userCurr.course_id.toString() === course._id.toString() && courseCurr.userId.toString() === _id.toString()) {
                    return true;
                  }
                  return acc2;
                }, false);
              
                return acc || response;
              }, false) || (enrolled_course.length === 0);
              const isEnrolled = enrolled_course.find(course=>course.course_id.toString()===req.params.id)
              if(!isEnrolled){
                isDone = true;
              }

            const average = course.reviews.reduce((acc,curr)=>{
                acc = acc+curr.rating;
                return acc/totalReviews;
            },0)
            
            res.status(200).json(success("OK",{reviews:course.reviews,currentUser:isDone,average:average,totalReviews:totalReviews}));
        }catch(err){
            res.status(500).json(error("Something wen't wrong, Try after sometimes"))
        }
    },

    updateVideoProgress:async(req,res)=>{
        const { video_id, progress } = req.body;
        try {
            
            const courseId = new mongoose.Types.ObjectId(req.params.id)
            // Find the relevant enrolled course for the user
            const user = await User.findOne({
                email: req.user,
            });
            const enrolled_course = user.enrolled_course.reduce((acc,curr)=>{
                if(curr.course_id.toString()===courseId.toString()){
                    return curr;
                }
            },{})
            console.log(enrolled_course)
            // Update the video progress for the relevant video
            const videoIndex = enrolled_course.video_progress.findIndex(
                (video) => video.video_id.toString() === video_id
            );
            
            if (videoIndex === -1) {
                // If the video doesn't exist, add it to the video progress array
                enrolled_course.video_progress.push({
                video_id: video_id,
                progress: 0,
                watched: true,
                });
            } else {
                // Update the existing video progress object
                const videoProgress = enrolled_course.video_progress[videoIndex];
                videoProgress.progress = progress;
                videoProgress.watched = true;
            }
            
            // Save the updated enrolled course to the database
            await user.save();
            
            // Return a success response
            return res.status(200).json({ message: 'Video progress updated' });
          } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Something went wrong" });
          }
    },
    getVideorogress:async(req,res)=>{
       
            try {
              // Get the course ID and video ID from the request parameters
              const courseId = new mongoose.Types.ObjectId(req.params.id);
              const videoId = req.params.videoId;
              
              // Find the relevant enrolled course for the user
              const user = await User.findOne({ email: req.user });
              const enrolled_course = user.enrolled_course.find(
                (course) => course.course_id.toString() === courseId.toString()
              );
              
              // Find the relevant video progress for the video
              const videoProgress = enrolled_course.video_progress.find(
                (video) => video.video_id === videoId
              );
              console.log(videoProgress,"===viddeo")
              if (!videoProgress) {
                // If the video progress is not found, return an error
                return res.status(404).json({ message: 'Video progress not found' });
              }
              
              // Return the video progress
              return res.status(200).json(success("OK",videoProgress));
            } catch (error) {
              console.error(error);
              return res.status(500).json({ message: 'Something went wrong' });
            }
         
    },

}