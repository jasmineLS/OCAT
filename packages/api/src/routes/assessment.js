/* const { AssessmentService } = require(`../microservices`);
const { ResponseHandler } = require(`../utils`);

const { Router } = require(`express`);

const assessmentRouter = Router();

assessmentRouter.post(
  `/`,
  async (req, res, next) => {
    try {
      const { assessment } = req.body;

      // verify that your data is making it here to the API by using console.log(assessment);
      // call the AssessmentService.submit function from packages/api/src/microservices/Assessment-Service.js and
      // supply the correct parameters

      ResponseHandler(
        res,
        `Submitted assessment`,
        {},
      );
    } catch (err) {
      next(err);
    }
  },
);

assessmentRouter.get(
  `/`,
  async (req, res, next) => {
    try {
      // verify that your data is making it here to the API by using console.log();
      // call the AssessmentService.getList function from packages/api/src/microservices/Assessment-Service.js
      const assessments = [];

      ResponseHandler(
        res,
        `Fetched assessments`,
        { assessments },
      );
    } catch (err) {
      next(err);
    }
  },
);

module.exports = { assessmentRouter }; */

const { AssessmentService } = require(`../microservices`);
const { ResponseHandler } = require(`../utils`);
const { Router } = require(`express`);

const assessmentRouter = Router();

assessmentRouter.post(`/`, async (req, res, next) => {
  try {
    // Directly use req.body as the assessment
    const assessment = req.body;

    // eslint-disable-next-line no-console
    console.log(`Received assessment:`, assessment);

    // Call the AssessmentService to submit the assessment
    const result = await AssessmentService.submit(assessment);

    // Handle response with the result of the submission
    ResponseHandler(
      res,
      `Submitted assessment`,
      { result },
    );
  } catch (err) {
    next(err);
  }
});

module.exports = { assessmentRouter };
