const { Op } = require(`sequelize`);
const { Assessment } = require(`../database/models`);
const Logger = require(`../utils/Logger`);

// Handles the submission of a new assessment record to the database
const submit = async (assessment) => {
  try {
    const createdAssessment = await Assessment.create(assessment); // Save assessment data
    return createdAssessment; // Return the created record
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
};

const getList = async () => {
  try {
    const assessments = await Assessment.findAll({
      raw: true,
    });
    return assessments;
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
};
// Retrieves filtered assessment records with pagination
const getFilteredAssessments = async (filters, { limit = 15, offset = 0 }) => {
  try {
    const where = {};

    if (filters.catName) {
      where.catName = { [Op.iLike]: `%${filters.catName}%` };
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

    // Enforce a strict limit of 15 per page
    limit = Math.min(limit, 15);
    Logger.info(`Final limit applied:`, limit); // Log the final limit value
    Logger.info(`Offset applied:`, offset); // Log the offset value

    // Query database for filtered assessments with pagination and sorting
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
  submit,
};
