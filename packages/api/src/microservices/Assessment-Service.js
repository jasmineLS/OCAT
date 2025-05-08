const { Assessment } = require(`../database/models`);

exports.submit = async (assessment) => {
  try {
    return await Assessment.create(assessment);
  } catch (error) {
    // Optionally add context to the error
    error.statusCode = 500;
    throw error;
  }
};

exports.getList = async () => {
  try {
    return await Assessment.findAll();
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
};
