import express from "express";
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json({
    message: "Welcome to the API",
    data: null,
  });
});

export const indexRouter = router;
