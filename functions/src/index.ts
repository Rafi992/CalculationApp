import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
interface Calculation {
  id: string;
  calculation: string;
  result: string;
  date: string;
}

admin.initializeApp();

const db = admin.firestore();

export const addCalculationToCommunication = functions.firestore
  .document("users/{documentId}")
  .onWrite(async (change, context) => {
    const userId = context.params.documentId;

    const newValue = change.after.data();
    const previousValue = change.before.data();

    if (!newValue || !previousValue) {
      return null;
    }

    const newCalculations = newValue.calculationHistory;
    const previousCalculations = previousValue.calculationHistory;
    // Find the new calculations added to the calculationHistory array
    const addedCalculations = newCalculations.filter(
      (calculation: Calculation) =>
        !previousCalculations.some(
          (prevCalc: Calculation) =>
            prevCalc.calculation === calculation.calculation
        )
    );

    if (addedCalculations.length === 0) {
      return null;
    }

    // Add the new calculations to the communication collection
    const communicationRef = db.collection("communication").doc(userId);
    await communicationRef.set(
      {
        userId,
        calculations: admin.firestore.FieldValue.arrayUnion(
          ...addedCalculations
        ),
      },
      { merge: true }
    );

    return null;
  });
