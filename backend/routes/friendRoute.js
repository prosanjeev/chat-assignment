import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { acceptFriendRequest, listFriendRequests, rejectFriendRequest, sendFriendRequest } from "../controllers/friendController.js";

const router = express.Router();

// router.route("/send/:id").post(isAuthenticated,sendMessage);
// router.route("/:id").get(isAuthenticated, getMessage);

router.post('/send-friend-request', sendFriendRequest);
router.post('/accept-friend-request/:requestId', acceptFriendRequest);
router.post('/reject-friend-request/:requestId', rejectFriendRequest);
router.get('/friend-requests/:userId', listFriendRequests);

export default router;