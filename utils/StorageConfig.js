import path from 'path';
import multer from 'multer';


// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory where images will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Create a unique filename
  },
});


// File filter to accept only specific file types (optional)
const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
  
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images Only!');
    }
  };


// Export the upload variable
export const upload = multer({
    storage: storage,
    fileFilter: fileFilter, // Add file filter (optional)
  });
  


//   // Endpoint to handle image upload
//   app.post('/upload_image', upload.single('image'), (req, res) => {
//     if (req.file) {
//       // Return the URL of the uploaded image
//       res.json({ link: `/uploads/${req.file.filename}` });
//     } else {
//       res.status(400).send('No image uploaded');
//     }
//   });
