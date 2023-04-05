const express = require('express');
const { adminLogin, getAllUsers, updateUserStatus, getAllInstructors } = require('../controller/admin/adminAuth');
const { tokenVerification } = require('../middlewares/authMiddlewares');
const upload = require('../config/multer');

const router = express.Router();

router.get('/users',tokenVerification,getAllUsers);
router.get('/instructors',tokenVerification,getAllInstructors);

router.post('/login',adminLogin);

router.put('/users/status/:id',tokenVerification,updateUserStatus);



module.exports = router;