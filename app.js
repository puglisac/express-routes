const express = require("express");
const { findAvg, findMedian, findMode } = require("./methods");
const ExpressError = require("./expressError");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/mean", function(req, res) {
    if (!req.query["nums"]) {
        throw new ExpressError("Please enter numbers seperated by a comma as part of the query key", 400);
    }
    const avg = findAvg(req.query["nums"]);
    return res.json({ operation: "mean", value: avg });
});

app.get("/median", function(req, res) {
    if (!req.query["nums"]) {
        throw new ExpressError("Please enter numbers seperated by a comma as part of the query key", 400);
    }
    const median = findMedian(req.query["nums"]);

    return res.json({ operation: "median", value: median });
});

app.get("/mode", function(req, res) {
    if (!req.query["nums"]) {
        throw new ExpressError("Please enter numbers seperated by a comma as part of the query key", 400);
    }
    const mode = findMode(req.query["nums"]);
    return res.json({ operation: "mode", value: mode });
});

app.get("/all", function(req, res) {
    if (!req.query["nums"]) {
        throw new ExpressError("Please enter numbers seperated by a comma as part of the query key", 400);
    }
    const avg = findAvg(req.query["nums"]);
    const median = findMedian(req.query["nums"]);
    const mode = findMode(req.query["nums"]);
    return res.json({ mean: avg, median: median, mode: mode });
});

app.use(function(req, res, next) {
    const notFoundError = new ExpressError("Not Found", 404);
    return next(notFoundError);
});

app.use(function(err, req, res, next) {
    // the default status is 500 Internal Server Error
    let status = err.status || 500;
    let message = err.message;

    // set the status and alert the user
    return res.status(status).json({
        error: { message, status }
    });
});

app.listen(3000, function() {
    console.log("Server started on port 3000.");
});