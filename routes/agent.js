const express = require("express");
const router = express.Router();
const middleware = require("../middleware/index.js");
const agentController = require("../controller/agentController.js");

// Agent dashboard route
router.get("/agent/dashboard", middleware.ensureAgentLoggedIn, agentController.agentDashboard);

// Agent pending collections route
router.get("/agent/collections/pending", middleware.ensureAgentLoggedIn, agentController.agentPendingCollections);

// Agent previous collections route
router.get("/agent/collections/previous", middleware.ensureAgentLoggedIn, agentController.agentPreviousCollections);

// View collection details route
router.get("/agent/collection/view/:collectionId", middleware.ensureAgentLoggedIn, agentController.viewCollection);

// Mark collection as collected route
router.get("/agent/collection/collect/:collectionId", middleware.ensureAgentLoggedIn, agentController.collectCollection);

// Agent profile route
router.get("/agent/profile", middleware.ensureAgentLoggedIn, agentController.viewProfile);

// Update agent profile route
router.put("/agent/profile", middleware.ensureAgentLoggedIn, agentController.updateProfile);

module.exports = router;
