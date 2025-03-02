const mongoose = require('mongoose');

const applicantSchema = new mongoose.Schema({
    url : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    education : {
        degree : String,
        branch: String,
        institution: String,
        year: Number
    },
    experience: {
        job_title: String,
        company: String,
        start_date: String,
        end_date: String
  },
  skills: [String],
  summary: String

},{ timestamps : true });

module.exports = mongoose.model('Applicant', applicantSchema);