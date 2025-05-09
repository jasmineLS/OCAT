const { Assessment } = require(`../database/models`);

exports.submit = async (assessment) => {
  try {
    const createdAssessment = await Assessment.create(assessment); // Save assessment data
    return createdAssessment; // Return the created record
  } catch (error) {
    error.statusCode = 500; // Add status code for error handling
    throw error;
  }
};

exports.getList = async () => {
  try {
    const assessments = await Assessment.findAll({
      raw: true, // Return plain objects instead of Sequelize instances
    });
    return assessments;
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
};
