const {analyzeResume, encryptionService} = require('../services');
const Applicant = require('../models/applicant-model');
const pdf = require('pdf-parse');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');

async function processResume(req, res) {
    try {
        //url -> req.body
        const {url} = req.body;
        //validation
        if (!url) {
            throw new AppError('PDF URL is required', StatusCodes.BAD_REQUEST);
        }
        //extrct text
        const response = await fetch(url);
        const buffer = await response.arrayBuffer();
        const data = await pdf(buffer);
        console.log("data", data);

        if (!data.text) {
            throw new AppError('No text content found in PDF', StatusCodes.INTERNAL_SERVER_ERROR);
        }
        //pass data to gemini
        const resumeData = await analyzeResume(data.text);
        // Encrypt sensitive data
        const encryptedData = {
            ...resumeData,
            name: encryptionService.encrypt(resumeData.name),
            email: encryptionService.encrypt(resumeData.email)
        };

        console.log("encryptedData", encryptedData);

        // Save to database
        const applicant = new Applicant(encryptedData);
        await applicant.save();
  
        return res
                .status(StatusCodes.OK)
                .json({ success : true, message: 'Resume processed successfully' });
    } catch (error) {
        console.log("error at res con", error);
        return res
                .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
                .json({success : false, error : error.message})
    }
};

module.exports = {processResume};