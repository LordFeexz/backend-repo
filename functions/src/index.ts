/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import apiController from "../../controllers/api";
import errorHandler from "../../middlewares/errorHandler";

export const fetchUserData = onRequest(async (req, res) => {
  try {
    logger.info("fetch-user-data");
    await apiController.getUsersFn(req, res);
  } catch (err) {
    errorHandler(err, req, res, () => {});
  }
});

export const updateUserData = onRequest(async (req, res) => {
  try {
    await apiController.updateDataFn(req, res);
  } catch (err) {
    errorHandler(err, req, res, () => {});
  }
});

export const addUserData = onRequest(async (req, res) => {
  try {
    await apiController.addDataFn(req, res);
  } catch (err) {
    errorHandler(err, req, res, () => {});
  }
});

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
