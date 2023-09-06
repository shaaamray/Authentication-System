// routes decide where the url endpoint will land, it also decides what actions should be performed
// routes take an url to the corresponding controller

const express = require("express");
const { signup, login, verifyToken, getUser, refreshToken } = require("../controllers/user-contoller");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/user", verifyToken, getUser);
router.get("/refresh", refreshToken, verifyToken, getUser);

module.exports = router