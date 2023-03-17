const express = require("express");
const usersRouter = require("./routes");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

app.use("/", usersRouter);

// app.use((req, res, next) => {
//   next(createError(404));
// });

// app.use((err, req, res, next) => {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

app.listen(4000, () => {
  console.log("listening at port 4000");
});
