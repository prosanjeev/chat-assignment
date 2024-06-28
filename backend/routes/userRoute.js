import express from "express";
import {  listFriendRequests, listFriends, listNonFriends, login, logout, register } from "../controllers/userController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.get('/friends', isAuthenticated, listFriends); 
router.get('/friendRequests', isAuthenticated, listFriendRequests); 
router.route("/").get(isAuthenticated, listNonFriends);

export default router;