const postPredictHandler = require("../server/handler");
const getAllPredictionsHandler = require("../services/getHistory");

const routes = [
  {
    path: "/predict",
    method: "POST",
    handler: postPredictHandler,
    options: {
      payload: {
        maxBytes: 1000000,
        output: "data",
        allow: "multipart/form-data",
        parse: true,
        multipart: true,
      },
    },
  },
  {
    path: "/predict/histories",
    method: "GET",
    handler: getAllPredictionsHandler,
  },
];

module.exports = routes;
