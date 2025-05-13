const { AssessmentService } = require(`../microservices`);
const { ResponseHandler } = require(`../utils`);
const { Router } = require(`express`);
const Logger = require(`../utils/Logger`);

const assessmentRouter = Router();

assessmentRouter.post(`/`, async (req, res, next) => {
  try {
    const assessment = req.body;
    const result = await AssessmentService.submit(assessment); // Call submit function
    ResponseHandler(res, `Submitted assessment`, { result }); // Return the created record
  } catch (err) {
    Logger.error(`Error in POST / route:`, err.message); // Log the error
    next(err);
  }
});

assessmentRouter.get(`/`, async (req, res, next) => {
  try {
    const results = await AssessmentService.getList();
    ResponseHandler(res, `Fetched ${results.length} assessments`, { results });
  } catch (err) {
    Logger.error(`Error in GET / route:`, err.message); // Log the error
    next(err);
  }
});
// Retrieves assessments filtered by multiple fields
assessmentRouter.get(`/filtered`, async (req, res) => {
  try {
    const { catDob, catName, instrumentType, limit = 10, offset = 0, riskLevel } = req.query;

    const filters = { catDob, catName, instrumentType, riskLevel };
    const pagination = { limit: parseInt(limit, 10), offset: parseInt(offset, 10) };

    Logger.info(`Incoming filters:`, filters); // Log incoming filters
    Logger.info(`Pagination details:`, pagination); // Log pagination details

    const { count, rows } = await AssessmentService.getFilteredAssessments(filters, pagination);

    Logger.info(`Query results:`, { count, rows }); // Log query results
    res.status(200).json({ count, rows });
  } catch (err) {
    Logger.error(`Error in /filtered route:`, err.message); // Log the error message
    Logger.error(`Stack trace:`, err.stack); // Log the stack trace
    res.status(err.statusCode || 500).json({ error: err.message || `Internal Server Error` });
  }
});

module.exports = { assessmentRouter };
