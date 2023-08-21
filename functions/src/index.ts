import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();

exports.updateCommunicationData = functions.firestore
  .document("users/{userId}")
  .onUpdate(async (change, context) => {
    const newValue = change.after.data();
    const previousValue = change.before.data();

    const userId = context.params.userId;
    // Pobierz informacje o użytkowniku z Firebase
    const userRecord = await admin.auth().getUser(userId);
    const username = userRecord.displayName || "Unknown";

    // Sprawdź, czy pole calculationHistory zostało zmienione
    if (newValue.calculationHistory !== previousValue.calculationHistory) {
      const newHistory = newValue.calculationHistory;

      const communicationData = newHistory.map((obj: any) => {
        return { ...obj, userName: username.split(" ")[0] };
      });

      // Aktualizuj kolekcję "communication" z nową historią obliczeń
      return admin
        .firestore()
        .collection("communication")
        .doc("data")
        .update({
          calculationHistory: admin.firestore.FieldValue.arrayUnion(
            ...communicationData
          ),
        });
    }
    return null;
  });
