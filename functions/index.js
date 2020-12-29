const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
// const { db } = require("../src/firebase.js");

const db = admin.firestore();

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

exports.calculateScores = functions.https.onRequest((request, response) => {
  db.ref("leagues/zHl5wrliJjxuc3NegSh3")
    .get()
    .then((doc) => {
      if (doc.exists) {
        response.send("Did Something");
      } else {
        throw new Error("Does not exist");
      }
      return null;
    })
    .catch((error) => response.send(error));
});

// exports.updateScores = functions.database
//   .ref("/shows/RPDR/seasons/US_Reg_13/episodes")
//   .onWrite((event) => {
//     db.collection("leagues");
//     return "this function ran!";
//   });
