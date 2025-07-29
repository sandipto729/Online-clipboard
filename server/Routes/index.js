import express from 'express';
const router=express.Router();
import FileController from '../controller/file_controller.js';
import multer from 'multer';
const upload = multer({ dest: 'uploads/' }); // Temporary storage for uploaded files

router.post('/upload',upload.single('file'),FileController.fileUpload);
router.post('/sendfile', FileController.fileUpload);
router.post('/retrieve', FileController.retrieveFile);


export default router;