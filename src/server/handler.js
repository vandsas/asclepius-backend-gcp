const predictClassification = require("../services/inferenceService");
const { savePredictionData } = require("../services/storeData");
const crypto = require("crypto");

async function postPredictHandler(request, h) {
  try {
    const { image } = request.payload;
    const { model } = request.server.app;

    if (Buffer.byteLength(image) > 1000000) {
      const response = h.response({
        status: "fail",
        message: "Payload content length greater than maximum allowed: 1000000",
      });
      response.code(413);
      return response;
    }

    const { explanation, suggestion } = await predictClassification(model, image);
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    const data = {
      id: id,
      result: explanation,
      suggestion: suggestion,
      createdAt: createdAt,
    };

    await savePredictionData(id, data);

    const response = h.response({
      status: "success",
      message: "Model is predicted successfully",
      data,
    });
    response.code(201);
    return response;
  } catch (error) {
    const response = h.response({
      status: "fail",
      message: error.message,
    });
    response.code(400);
    return response;
  }
}

module.exports = postPredictHandler;
