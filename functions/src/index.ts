import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();

exports.syncCalculationHistory = functions.firestore
  .document("users/{userId}")
  .onUpdate((change, context) => {
    const newValue = change.after.data();
    const previousValue = change.before.data();

    // Sprawdź, czy pole calculationHistory zostało zmienione
    if (newValue.calculationHistory !== previousValue.calculationHistory) {
      const newHistory = newValue.calculationHistory;

      // Aktualizuj kolekcję "communication" z nową historią obliczeń
      return admin.firestore().collection("communication").doc("data").update({
        calculationHistory: newHistory,
      });
    }
    return null;
  });
