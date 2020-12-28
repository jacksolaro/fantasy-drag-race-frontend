const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { db } = require("../src/firebase");

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

exports.updateScores = functions.database
  .ref("/shows/RPDR/seasons/US_Reg_13/episodes")
  .onWrite((event) => {
    db.collection("leagues");
    return "this function ran!";
  });
