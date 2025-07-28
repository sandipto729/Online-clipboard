const express=require('express');
const router=express.Router();
const FileController=require('../controller/file_controller');

router.post('/upload',FileController.fileUpload);
router.post('/retrieve', FileController.retrieveFile);



module.exports=router;