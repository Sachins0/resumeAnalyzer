const express = require('express');

const { resumeController } = require('../../controllers');
const { authMiddlware } = require('../../middlewares');

const router = express.Router();

router.post(
    '/process',
    authMiddlware.aunthicatetoken,
    resumeController.processResume
);

module.exports = router;