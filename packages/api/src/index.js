const express = require(`express`);
const cookieParser = require(`cookie-parser`);
const helmet = require(`helmet`);
const nocache = require(`nocache`);
const createError = require(`http-errors`);
const cors = require(`cors`);
const config = require(`config`);
const { router } = require(`./routes`);
const { BooleanParser, ErrorHandler } = require(`./utils`);
const { getList } = require(`./microservices/Assessment-Service`);
require(`./database`);

const app = express();

app.use(
  cors({ origin: `*` }),
  helmet(),
  nocache(),
  express.json(),
  express.urlencoded({ extended: false }),
  cookieParser(),
  BooleanParser,
);

app.use(`/api`, router);

app.get(`/api/assessment/list`, async (req, res) => {
  try {
    const assessments = await getList(); // Call the getList function
    res.json({ data: { results: assessments } }); // Return the results in the expected format
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use(ErrorHandler);

const PORT = config.get(`server.port`);
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on ${PORT}`);
});
