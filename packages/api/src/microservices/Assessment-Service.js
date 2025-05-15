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

// Deletes an assessment record by ID
const deleteAssessment = async (id) => {
  try {
    Logger.info(`Attempting to delete assessment with ID: ${id}`); // Log the ID being deleted

    // Check if the assessment exists
    const assessment = await Assessment.findByPk(id);
    if (!assessment) {
      const error = new Error(`Assessment with ID ${id} not found`);
      error.statusCode = 404;
      throw error;
    }

    // Perform the deletion
    const deletedCount = await Assessment.destroy({
      where: { id },
    });

    if (deletedCount === 0) {
      const error = new Error(`Failed to delete assessment with ID ${id}`);
      error.statusCode = 500;
      throw error;
    }

    Logger.info(`Assessment with ID ${id} deleted successfully`);

    // Check if the table is empty and reset the auto-increment value
    const remainingCount = await Assessment.count();
    if (remainingCount === 0) {
      Logger.info(`No remaining records. Resetting auto-increment value.`);

      // Dynamically determine the sequence name
      const tableName = Assessment.getTableName();
      const { primaryKeyField } = Assessment;
      const sequenceName = `${tableName}_${primaryKeyField}_seq`;

      await Assessment.sequelize.query(`ALTER SEQUENCE "${sequenceName}" RESTART WITH 1;`);
    }

    return { message: `Assessment deleted successfully` };
  } catch (error) {
    Logger.error(`Error in deleteAssessment:`, error.message); // Log the error message
    Logger.error(`Stack trace:`, error.stack); // Log the stack trace for debugging
    error.statusCode = error.statusCode || 500;
    throw error;
  }
};

module.exports = {
  deleteAssessment, // Export the new function
  getFilteredAssessments,
  getList,
  submit,
};
