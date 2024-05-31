const express = require("express");
const router = express.Router();
const middleware = require("../middleware/index.js");
const adminController = require("../controller/adminController.js");

router.get("/admin/dashboard", middleware.ensureAdminLoggedIn, adminController.adminDashboard);
router.get("/admin/donations/pending", middleware.ensureAdminLoggedIn, adminController.adminPendingDonations);
router.get("/admin/donations/previous", middleware.ensureAdminLoggedIn, adminController.adminPreviousDonations);
router.get("/admin/donation/view/:donationId", middleware.ensureAdminLoggedIn, adminController.viewDonation);
router.get("/admin/donation/accept/:donationId", middleware.ensureAdminLoggedIn, adminController.acceptDonation);
router.get("/admin/donation/reject/:donationId", middleware.ensureAdminLoggedIn, adminController.rejectDonation);
router.get("/admin/donation/assign/:donationId", middleware.ensureAdminLoggedIn, adminController.assignAgent);
router.post("/admin/donation/assign/:donationId", middleware.ensureAdminLoggedIn, adminController.postAssignAgent);
router.get("/admin/agents", middleware.ensureAdminLoggedIn, adminController.listAgents);
router.get("/admin/profile", middleware.ensureAdminLoggedIn, adminController.viewProfile);
router.put("/admin/profile", middleware.ensureAdminLoggedIn, adminController.updateProfile);

module.exports = router;