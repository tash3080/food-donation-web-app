const express = require('express');
const router = express.Router();
const middleware = require('../middleware/index.js');
const donorController = require('../controller/donorController');

router.get('/donor/dashboard', middleware.ensureDonorLoggedIn, donorController.getDashboard);
router.get('/donor/donate', middleware.ensureDonorLoggedIn, donorController.getDonateForm);
router.post('/donor/donate', middleware.ensureDonorLoggedIn, donorController.postDonateForm);
router.get('/donor/donations/pending', middleware.ensureDonorLoggedIn, donorController.getPendingDonations);
router.get('/donor/donations/previous', middleware.ensureDonorLoggedIn, donorController.getPreviousDonations);
router.get('/donor/donation/deleteRejected/:donationId', donorController.deleteRejectedDonation);
router.get('/donor/profile', middleware.ensureDonorLoggedIn, donorController.getProfile);
router.put('/donor/profile', middleware.ensureDonorLoggedIn, donorController.updateProfile);

module.exports = router;