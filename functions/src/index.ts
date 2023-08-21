import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

export const updateCommunicationData = functions.https.onRequest(
  async (request, response) => {
    const db = admin.firestore();

    const userSnapshot = await db
      .collection("users")
      .doc(request.body.userId)
      .get();
    const user = userSnapshot.data();

    const communicationRef = db.collection("communication").doc("data");

    const calculationHistory = request.body.calculationHistory;
    const communicationData = calculationHistory.map((obj: any) => {
      return { ...obj, userName: user?.name.split(" ")[0] };
    });

    await communicationRef.update({
      calculationHistory: admin.firestore.FieldValue.arrayUnion(
        ...communicationData
      ),
    });

    response.send("Communication data updated successfully!");
  }
);
