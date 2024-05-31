const express = require("express");
const router = express.Router();
const homeController = require("../controller/homeController");

router.get("/", homeController.getWelcomePage);

router.get("/home/about-us", homeController.getAboutUsPage);

router.get("/home/mission", homeController.getMissionPage);

router.get("/home/contact-us", homeController.getContactUsPage);

router.get("/home/blog", homeController.getBlogPage);

module.exports = router;