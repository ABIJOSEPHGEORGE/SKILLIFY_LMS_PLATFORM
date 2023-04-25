const express = require('express');
const { adminLogin, getAllUsers, updateUserStatus, getAllInstructors } = require('../controller/admin/adminAuth');
const { tokenVerification } = require('../middlewares/authMiddlewares');
const {upload}= require('../config/multer');
const { addCategory, getAllCategory, updateCategoryStatus, deleteCategory, getCategory, editCategory, addSubcategory, allSubCategory, getSubCategory, editSubCategory, deleteSubCategory } = require('../controller/admin/categoryController');
const { allCourses, singleCourse, approveCourse, rejectCourse, courseStatus } = require('../controller/admin/courseController');


const router = express.Router();

router.get('/users',tokenVerification,getAllUsers);
router.get('/instructors',tokenVerification,getAllInstructors);
router.get('/categories',getAllCategory);
router.get('/category/:id',tokenVerification,getCategory);
router.get('/subcategories',allSubCategory);
router.get('/subcategory/:id/:sub',tokenVerification,getSubCategory);
router.get('/courses',tokenVerification,allCourses);
router.get('/course/:id',tokenVerification,singleCourse);

router.post('/login',adminLogin);
router.post('/category/create',tokenVerification,upload.single("category_image"),addCategory);
router.post('/subcategory/create',tokenVerification,addSubcategory);

router.put('/users/status/:id',tokenVerification,updateUserStatus);
router.put('/category/status/:id',tokenVerification,updateCategoryStatus);
router.put('/category/:id',tokenVerification,upload.single("category_image"),editCategory)
router.put('/subcategory/:sub',tokenVerification,editSubCategory);
router.put('/course/approve/:id',tokenVerification,approveCourse);
router.put('/course/reject/:id',tokenVerification,rejectCourse);
router.put('/course/status/:id',tokenVerification,courseStatus)

router.delete('/category/:id',tokenVerification,deleteCategory);
router.delete('/subcategory/:id/:sub',tokenVerification,deleteSubCategory);


module.exports = router;