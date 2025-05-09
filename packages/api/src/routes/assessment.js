const { AssessmentService } = require(`../microservices`);
const { ResponseHandler } = require(`../utils`);
const { Router } = require(`express`);

const assessmentRouter = Router();

assessmentRouter.post(`/`, async (req, res, next) => {
  try {
    const assessment = req.body;
    const result = await AssessmentService.submit(assessment); // Call submit function
    ResponseHandler(res, `Submitted assessment`, { result }); // Return the created record
  } catch (err) {
    next(err);
  }
});

assessmentRouter.get(`/`, async (req, res, next) => {
  try {
    const results = await AssessmentService.getList();
    ResponseHandler(res, `Fetched ${results.length} assessments`, { results });
  } catch (err) {
    next(err);
  }
});

assessmentRouter.get(`/list`, async (req, res) => {
  try {
    const results = await AssessmentService.getList(); // Fetch all assessments
    ResponseHandler(res, `Fetched ${results.length} assessments`, { results }); // Return the data
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message || `Internal Server Error` });
  }
});

module.exports = { assessmentRouter };
