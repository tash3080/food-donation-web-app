const User = require("../models/user.js");
const Donation = require("../models/donation.js");

// Controller for agent dashboard
exports.agentDashboard = async (req, res) => {
    try {
        const agentId = req.user._id;
        const numAssignedDonations = await Donation.countDocuments({ agent: agentId, status: "assigned" });
        const numCollectedDonations = await Donation.countDocuments({ agent: agentId, status: "collected" });

        res.render("agent/dashboard", {
            title: "Dashboard",
            numAssignedDonations,
            numCollectedDonations,
        });
    } catch (err) {
        console.log(err);
        req.flash("error", "Some error occurred on the server.");
        res.redirect("back");
    }
};

// Controller for agent pending collections
exports.agentPendingCollections = async (req, res) => {
    try {
        const pendingCollections = await Donation.find({ agent: req.user._id, status: "assigned" }).populate("donor");
        res.render("agent/pendingCollections", { title: "Pending Collections", pendingCollections });
    } catch (err) {
        console.log(err);
        req.flash("error", "Some error occurred on the server.");
        res.redirect("back");
    }
};

// Controller for agent previous collections
exports.agentPreviousCollections = async (req, res) => {
    try {
        const previousCollections = await Donation.find({ agent: req.user._id, status: "collected" }).populate("donor");
        res.render("agent/previousCollections", { title: "Previous Collections", previousCollections });
    } catch (err) {
        console.log(err);
        req.flash("error", "Some error occurred on the server.");
        res.redirect("back");
    }
};

// Controller for viewing collection details
exports.viewCollection = async (req, res) => {
    try {
        const collectionId = req.params.collectionId;
        const collection = await Donation.findById(collectionId).populate("donor");
        res.render("agent/collection", { title: "Collection details", collection });
    } catch (err) {
        console.log(err);
        req.flash("error", "Some error occurred on the server.");
        res.redirect("back");
    }
};

// Controller for marking a collection as collected
exports.collectCollection = async (req, res) => {
    try {
        const collectionId = req.params.collectionId;
        await Donation.findByIdAndUpdate(collectionId, { status: "collected", collectionTime: Date.now() });
        req.flash("success", "Donation collected successfully");
        res.redirect(`/agent/collection/view/${collectionId}`);
    } catch (err) {
        console.log(err);
        req.flash("error", "Some error occurred on the server.");
        res.redirect("back");
    }
};

// Controller for viewing agent profile
exports.viewProfile = async (req, res) => {
    res.render("agent/profile", { title: "My Profile" });
};

// Controller for updating agent profile
exports.updateProfile = async (req, res) => {
    try {
        const id = req.user._id;
        const updateObj = req.body.agent; // updateObj: { firstName, lastName, gender, address, phone }
        await User.findByIdAndUpdate(id, updateObj);

        req.flash("success", "Profile updated successfully");
        res.redirect("/agent/profile");
    } catch (err) {
        console.log(err);
        req.flash("error", "Some error occurred on the server.");
        res.redirect("back");
    }
};
