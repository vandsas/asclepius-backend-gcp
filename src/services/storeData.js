const { Firestore } = require("@google-cloud/firestore");

const db = new Firestore();

async function savePredictionData(predictionId, predictionData) {
  const predictionsCollection = db.collection("predictions");
  return predictionsCollection.doc(predictionId).set(predictionData);
}

async function fetchAllPredictions() {
  const predictionsCollection = db.collection("predictions");
  const allPredictions = await predictionsCollection.get();
  return allPredictions;
}

module.exports = { savePredictionData, fetchAllPredictions };
