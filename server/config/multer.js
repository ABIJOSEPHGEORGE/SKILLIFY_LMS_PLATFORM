const multer = require('multer');


const DIR = './public/images';
const VIDEODIR = './public/course/videos';

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null,DIR);
//     },
//     filename: (req, file, cb) => {
//         console.log(file)
//         const fileName = file.originalname.toLowerCase().split(' ').join('-');
//         cb(null,fileName)
//     }
// });

// const videoStorage = multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,VIDEODIR);
//     },
//     filename:(req,file,cb)=>{
//         console.log(file)
//         const fileName = file.originalname.toLowerCase().split(' ').join("-")
//         cb(null,fileName)
//     }
// })

//  var upload = multer({
//     storage:storage,
//     fileFilter: (req, file, cb) => {
        
//         if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//             cb(null, true);
//         } else {
//             cb(null, false);
//             return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
//         }
//     },
// });

// var video = multer({
//     storage:videoStorage,
//     fileFilter:(req,file,cb)=>{
//         if (file.mimetype == "video/mov" || file.mimetype == "video/mp4" || file.mimetype == "video/mkv") {
//             cb(null, true);
//         } else {
//             cb(null, false);
//             return cb(new Error('Only .mov .mp4 .mkv format allowed!'));
//         }
//     }
// })


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // check the file type and store in the appropriate directory
      if (file.mimetype === 'video/mp4' || file.mimetype === 'video/mkv') {
        cb(null, VIDEODIR);
      } else if (file.mimetype.startsWith('image/')) {
        cb(null, DIR);
      } else {
        cb(new Error('Invalid file type'));
      }
    },
    filename: function (req, file, cb) {
      // set the file name and extension
      const ext = file.mimetype.split('/')[1];
      cb(null, file.fieldname + '-' + Date.now() + '.' + ext);
    },
  });
  
  const upload = multer({ storage });
module.exports ={
    upload
}