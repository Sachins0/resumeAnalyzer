const { GoogleGenerativeAI } = require('@google/generative-ai');
const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function analyzeResume(text) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    const prompt = `Analyze the following resume text and extract information in following format: ${text}
      your entire response/output is going to consist of a single JSON object {}, and you will NOT wrap it within JSON md markers:
      {
        "name": "full name",
        "email": "email address",
        "education": {
          "degree": "degree name",
          "branch": "specialization",
          "institution": "school/university name",
          "year": "graduation year"
        },
        "experience": {
          "job_title": "most recent job title",
          "company": "most recent company",
          "start_date": "start date",
          "end_date": "end date"
        },
        "skills": ["skill1", "skill2", ...],
        "summary": "brief professional summary"}`;
    const result = await model.generateContent(prompt);
    const response = await result.response.text();
    const cleanedResponse = response
                                  .replace(/```json/g, '')
                                  .replace(/```/g, '')
                                  .trim();
    return JSON.parse(cleanedResponse);
  } catch (error) {
    console.log("error at gemini service", error);
    throw new AppError('Something went wrong during analyzing resume', StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

module.exports = analyzeResume;