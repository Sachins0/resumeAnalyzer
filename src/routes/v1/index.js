const express= require('express');
const { infoController } = require('../../controllers');
const authRoutes = require('./auth-route');
const resumeRoutes = require('./resume-route');
const searchRoutes = require('./search-route');

const router=express.Router();

router.get('/info',infoController.info);

router.use('/auth', authRoutes);
router.use('/resume', resumeRoutes);
router.use('/search', searchRoutes);

module.exports=router;