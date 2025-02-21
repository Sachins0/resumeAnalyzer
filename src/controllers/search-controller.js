const {encryptionService} = require('../services');
const Applicant = require('../models/applicant-model');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');

async function searchResumes(req, res) {
    try {
        //name -> req.body
        const {name} = req.body;
        //validation
        if (!name) {
            throw new AppError('Search name is required', StatusCodes.BAD_REQUEST);
          }
        //find in DB
        const applicants = await Applicant.find();
        // Decrypt names and filter
        const matches = applicants.filter(applicant => {
            const decryptedName = encryptionService.decrypt(applicant.name).toLowerCase();
            return decryptedName.includes(name.toLowerCase());
        });

        if (matches.length === 0) {
            throw new AppError('No matching resumes found', StatusCodes.NOT_FOUND);
        }
    
        // Decrypt sensitive data before sending
        const decryptedMatches = matches.map(match => ({
            ...match.toObject(),
            name: encryptionService.decrypt(match.name),
            email: encryptionService.decrypt(match.email)
        }));

        console.log("decryptedmatch", decryptedMatches);

        //return res
        return res
                .status(StatusCodes.OK)
                .json({success : true, matches : decryptedMatches});
    } catch (error) {
        console.log("error at search contr", error);
        return res
                .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
                .json({success : false, error : error.message})
    }
};

module.exports = {searchResumes}
