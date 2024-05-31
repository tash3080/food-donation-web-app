const User = require("../models/user.js");
const Donation = require("../models/donation.js");

// Controller for admin dashboard
exports.adminDashboard = async (req, res) => {
    try {
        const numAdmins = await User.countDocuments({ role: "admin" });
        const numDonors = await User.countDocuments({ role: "donor" });
        const numAgents = await User.countDocuments({ role: "agent" });
        const numPendingDonations = await Donation.countDocuments({ status: "pending" });
        const numAcceptedDonations = await Donation.countDocuments({ status: "accepted" });
        const numAssignedDonations = await Donation.countDocuments({ status: "assigned" });
        const numCollectedDonations = await Donation.countDocuments({ status: "collected" });

        res.render("admin/dashboard", {
            title: "Dashboard",
            numAdmins,
            numDonors,
            numAgents,
            numPendingDonations,
            numAcceptedDonations,
            numAssignedDonations,
            numCollectedDonations,
        });
    } catch (err) {
        console.log(err);
        req.flash("error", "Some error occurred on the server.");
        res.redirect("back");
    }
};

// Controller for admin pending donations
exports.adminPendingDonations = async (req, res) => {
    try {
        const pendingDonations = await Donation.find({ status: ["pending", "accepted", "assigned"] }).populate("donor");
        res.render("admin/pendingDonations", { title: "Pending Donations", pendingDonations });
    } catch (err) {
        console.log(err);
        req.flash("error", "Some error occurred on the server.");
        res.redirect("back");
    }
};

// Controller for admin previous donations
exports.adminPreviousDonations = async (req, res) => {
    try {
        const previousDonations = await Donation.find({ status: "collected" }).populate("donor");
        res.render("admin/previousDonations", { title: "Previous Donations", previousDonations });
    } catch (err) {
        console.log(err);
        req.flash("error", "Some error occurred on the server.");
        res.redirect("back");
    }
};

// Controller for viewing donation details
exports.viewDonation = async (req, res) => {
    try {
        const donationId = req.params.donationId;
        const donation = await Donation.findById(donationId).populate("donor").populate("agent");
        res.render("admin/donation", { title: "Donation details", donation });
    } catch (err) {
        console.log(err);
        req.flash("error", "Some error occurred on the server.");
        res.redirect("back");
    }
};

// Controller for accepting a donation
exports.acceptDonation = async (req, res) => {
    try {
        const donationId = req.params.donationId;
        await Donation.findByIdAndUpdate(donationId, { status: "accepted" });
        req.flash("success", "Donation accepted successfully");
        res.redirect(`/admin/donation/view/${donationId}`);
    } catch (err) {
        console.log(err);
        req.flash("error", "Some error occurred on the server.");
        res.redirect("back");
    }
};

// Controller for rejecting a donation
exports.rejectDonation = async (req, res) => {
    try {
        const donationId = req.params.donationId;
        await Donation.findByIdAndUpdate(donationId, { status: "rejected" });
        req.flash("success", "Donation rejected successfully");
        res.redirect(`/admin/donation/view/${donationId}`);
    } catch (err) {
        console.log(err);
        req.flash("error", "Some error occurred on the server.");
        res.redirect("back");
    }
};

// Controller for assigning an agent to a donation
exports.assignAgent = async (req, res) => {
    try {
        const donationId = req.params.donationId;
        const agents = await User.find({ role: "agent" });
        const donation = await Donation.findById(donationId).populate("donor");
        res.render("admin/assignAgent", { title: "Assign agent", donation, agents });
    } catch (err) {
        console.log(err);
        req.flash("error", "Some error occurred on the server.");
        res.redirect("back");
    }
};

// Controller for posting agent assignment details
exports.postAssignAgent = async (req, res) => {
    try {
        const donationId = req.params.donationId;
        const { agent, adminToAgentMsg } = req.body;
        await Donation.findByIdAndUpdate(donationId, { status: "assigned", agent, adminToAgentMsg });
        req.flash("success", "Agent assigned successfully");
        res.redirect(`/admin/donation/view/${donationId}`);
    } catch (err) {
        console.log(err);
        req.flash("error", "Some error occurred on the server.");
        res.redirect("back");
    }
};

// Controller for listing agents
exports.listAgents = async (req, res) => {
    try {
        const agents = await User.find({ role: "agent" });
        res.render("admin/agents", { title: "List of agents", agents });
    } catch (err) {
        console.log(err);
        req.flash("error", "Some error occurred on the server.");
        res.redirect("back");
    }
};

// Controller for viewing admin profile
exports.viewProfile = async (req, res) => {
    res.render("admin/profile", { title: "My profile" });
};

// Controller for updating admin profile
exports.updateProfile = async (req, res) => {
    try {
        const id = req.user._id;
        const updateObj = req.body.admin; // updateObj: { firstName, lastName, gender, address, phone }
        await User.findByIdAndUpdate(id, updateObj);

        req.flash("success", "Profile updated successfully");
        res.redirect("/admin/profile");
    } catch (err) {
        console.log(err);
        req.flash("error", "Some error occurred on the server.");
        res.redirect("back");
    }
};
