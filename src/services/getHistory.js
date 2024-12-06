const { fetchAllPredictions } = require("./storeData");

async function getAllPredictionsHandler(request, h) {
  try {
    const snapshot = await fetchAllPredictions();

    if (!snapshot.empty) {
      const formattedPredictions = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          history: {
            result: data.result,
            createdAt: data.createdAt,
            suggestion: data.suggestion,
            id: doc.id,
          },
        };
      });

      return h
        .response({
          status: "success",
          data: formattedPredictions,
        })
        .code(200);
    }

    return h
      .response({
        status: "success",
        data: [],
        message: "No predictions found.",
      })
      .code(200);
  } catch (error) {
    console.error("Error fetching predictions:", error);

    return h
      .response({
        status: "fail",
        message: "Failed to fetch predictions",
      })
      .code(500);
  }
}

module.exports = getAllPredictionsHandler;
