const express = require('express');
const { tokenVerification, isBlocked } = require('../middlewares/authMiddlewares');
const {upload} = require('../config/multer');
const { uploadVideo, createCourse, getAllCourses, deletCourse } = require('../controller/instructor/courseController');
const { parentSubCategories } = require('../controller/admin/categoryController');
const { singleCourse } = require('../controller/user/courseController');


const router = express.Router()

router.use(tokenVerification)
router.use(isBlocked)

router.get('/subcategories/:id',parentSubCategories);
router.get('/course/',getAllCourses);
router.get('/course/:id',singleCourse);

router.post('/course/upload-video',upload.single('section_video'),uploadVideo);
router.post('/course/create-course',upload.fields([
    { name: 'course_image', maxCount: 1 },
    { name: 'promotional_video', maxCount: 1 },
  ]),createCourse);


router.delete('/course/:id',deletCourse)

module.exports = router;