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
import authMiddleware from "../../middlewares/authMiddleware";

export const fetchUserData = onRequest(async (req, res) => {
  try {
    logger.info("fetchUserData");
    await apiController.getUsersFn(req, res);
  } catch (err) {
    errorHandler(err, req, res, () => {});
  }
});

export const updateUserData = onRequest(async (req, res) => {
  try {
    logger.info("updateUserData");
    await authMiddleware.authFn(req, res);
    await apiController.updateDataFn(req, res);
  } catch (err) {
    errorHandler(err, req, res, () => {});
  }
});

export const addUserData = onRequest(async (req, res) => {
  try {
    logger.info("addUserData");
    await authMiddleware.authFn(req, res);
    await apiController.addDataFn(req, res);
  } catch (err) {
    errorHandler(err, req, res, () => {});
  }
});

export const adminLogin = onRequest(async (req, res) => {
  try {
    logger.info("adminLogin");
    await apiController.adminLoginFn(req, res);
  } catch (err) {
    errorHandler(err, req, res, () => {});
  }
});
