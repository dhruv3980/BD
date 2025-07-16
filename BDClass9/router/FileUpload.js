const express = require('express');
const router = express.Router()

// now load the controller 

const {localFileUpload} = require('../controllers/localFileUpload');

const {imageUpload, videoUpload, imageSizeReduced} = require('../controllers/localFileUpload')

router.post('/localFile', localFileUpload);
router.post('/imageUpload', imageUpload)
router.post('/videoUpload', videoUpload);
router.post('/imageSizeReduced', imageSizeReduced)

module.exports = router;