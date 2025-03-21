import * as functions from "firebase-functions/v1";
import * as admin from "firebase-admin";

admin.initializeApp();

const messagesRef = admin.firestore().collection("messages");

export const updateScheduledMessages = functions.pubsub
  .schedule("every 1 minutes")
  .onRun(async (context) => {
    const now = new Date();

    const querySnapshot = await messagesRef
      .where("status", "==", "agendada")
      .where("scheduledAt", "<=", now)
      .get();

    const updates = querySnapshot.docs.map((doc) =>
      doc.ref.update({ status: "enviada" })
    );

    await Promise.all(updates);

    console.log(`${updates.length} mensagens atualizadas para "enviada".`);
  });
