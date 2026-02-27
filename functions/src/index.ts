import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import * as admin from "firebase-admin";

admin.initializeApp();

export const submitContactForm = onRequest({ cors: true }, async (req, res) => {
    if (req.method !== "POST") {
        res.status(405).send("Method Not Allowed");
        return;
    }

    try {
        const { name, email, inquiryType, message } = req.body;

        if (!name || !email || !message) {
            res.status(400).send("Missing required fields");
            return;
        }

        // Store in Firestore
        await admin.firestore().collection("contact_submissions").add({
            name,
            email,
            inquiryType: inquiryType || "other",
            message,
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            read: false
        });

        logger.info(`Received inquiry from ${email}`, { structuredData: true });

        res.status(200).send({ success: true, message: "Inquiry received successfully." });
    } catch (error) {
        logger.error("Error submitting contact form", error);
        res.status(500).send({ success: false, error: "Internal Server Error" });
    }
});

export const subscribeNewsletter = onRequest({ cors: true }, async (req, res) => {
    if (req.method !== "POST") {
        res.status(405).send("Method Not Allowed");
        return;
    }

    try {
        const { email } = req.body;

        if (!email) {
            res.status(400).send("Missing email");
            return;
        }

        // Store in Firestore
        await admin.firestore().collection("newsletter_subscribers").doc(email).set({
            email,
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            active: true
        });

        logger.info(`New newsletter subscriber: ${email}`, { structuredData: true });

        res.status(200).send({ success: true, message: "Subscribed successfully." });
    } catch (error) {
        logger.error("Error subscribing to newsletter", error);
        res.status(500).send({ success: false, error: "Internal Server Error" });
    }
});
