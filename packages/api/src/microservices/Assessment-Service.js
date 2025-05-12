const { Op } = require(`sequelize`);
const { Assessment } = require(`../database/models`);
const Logger = require(`../utils/Logger`); // Ensure the path is correct

const submit = async (assessment) => {
  try {
    const createdAssessment = await Assessment.create(assessment); // Save assessment data
    return createdAssessment; // Return the created record
  } catch (error) {
    error.statusCode = 500; // Add status code for error handling
    throw error;
  }
};

const getList = async () => {
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

const getFilteredAssessments = async (filters, { limit, offset }) => {
  try {
    const where = {};

    if (filters.catName) {
      where.catName = { [Op.iLike]: `%${filters.catName}%` }; // PostgreSQL-friendly LIKE
    }
    if (filters.catDob) {
      where.catDob = filters.catDob; // Exact match for date
    }
    if (filters.instrumentType) {
      where.instrumentType = filters.instrumentType; // Exact match
    }
    if (filters.riskLevel) {
      where.riskLevel = filters.riskLevel; // Exact match
    }

    Logger.info(`Filters received:`, filters); // Log incoming filters
    Logger.info(`Generated WHERE clause:`, where); // Log the WHERE clause

    const result = await Assessment.findAndCountAll({
      limit,
      offset,
      order: [[ `createdAt`, `DESC` ]], // Descending order
      where,
    });

    Logger.info(`Query results:`, result); // Log the query result
    return result;
  } catch (error) {
    Logger.error(`Error in getFilteredAssessments:`, error.message); // Log the error message
    Logger.error(`Stack trace:`, error.stack); // Log the stack trace for debugging
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  getFilteredAssessments,
  getList,
  submit, // Ensure this is exported
};
