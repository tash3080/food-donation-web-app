const User = require("../models/user.js");
const passport = require("passport");
const bcrypt = require("bcryptjs");

// Display signup page
exports.signupPage = (req, res) => {
    res.render("auth/signup", { title: "User Signup" });
};

// Handle user signup
exports.signup = async (req, res) => {
    const { firstName, lastName, email, password1, password2, role } = req.body;
    let errors = [];

    if (!firstName || !lastName || !email || !password1 || !password2) {
        errors.push({ msg: "Please fill in all the fields" });
    }
    if (password1 != password2) {
        errors.push({ msg: "Passwords are not matching" });
    }
    if (password1.length < 4) {
        errors.push({ msg: "Password length should be at least 4 characters" });
    }
    if (errors.length > 0) {
        return res.render("auth/signup", {
            title: "User Signup",
            errors,
            firstName,
            lastName,
            email,
            password1,
            password2,
        });
    }

    try {
        const user = await User.findOne({ email: email });
        if (user) {
            errors.push({ msg: "This Email is already registered. Please try another email." });
            return res.render("auth/signup", {
                title: "User Signup",
                firstName,
                lastName,
                errors,
                email,
                password1,
                password2,
            });
        }

        const newUser = new User({ firstName, lastName, email, password: password1, role });
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(newUser.password, salt);
        newUser.password = hash;
        await newUser.save();
        req.flash("success", "You are successfully registered and can log in.");
        res.redirect("/auth/login");
    } catch (err) {
        console.log(err);
        req.flash("error", "Some error occurred on the server.");
        res.redirect("back");
    }
};

// Display login page
exports.loginPage = (req, res) => {
    res.render("auth/login", { title: "User login" });
};

exports.login = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            req.flash("error", info.message);
            return res.redirect("/auth/login");
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            req.session.returnTo = `/${user.role}/dashboard`; // Set the correct redirect URL
            return res.redirect(req.session.returnTo);
        });
    })(req, res, next);
};

// Handle user logout
exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error(err);
            req.flash("error", "Error occurred during logout.");
        } else {
            req.flash("success", "Logged-out successfully");
        }
        res.redirect("/");
    });
};
