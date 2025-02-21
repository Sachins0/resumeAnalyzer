const express = require('express');

const { searchController } = require('../../controllers');
const { authMiddlware } = require('../../middlewares');

const router = express.Router();

router.post(
    '/name',
    authMiddlware.aunthicatetoken,
    searchController.searchResumes
);

module.exports = router;