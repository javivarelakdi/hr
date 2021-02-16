const express = require("express");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const User = require("../models/user");

const router = express.Router();

const checkIfLoggedIn = (req, res, next) => {
    if (req.session) {
        next();
    } else {
        res.status(401).json({ code: "unauthorized" });
    }
};

router.use(checkIfLoggedIn);

// returns list of users
router.get("/", (req, res) => {
    User.find(function (err, users) {
        if (err)
            res.json({
                status: "error",
                message: err
            });
        res.json({
            status: "success",
            message: "Got User Successfully!",
            data: users       
        });
    });
});

// shows specific user, still to be populated with requests and companies
router.get("/:id", (req, res, next) => {
    User.findById(req.params.id)
        // .populate("requests")
        // .populate("companies")
        .then(user => {
            res.status(200).json(user);
        })
        .catch(next);
});

// UPDATE user POST action
router.post("/:id", async (req, res, next) => {
    const { 
        username,
        email,
        password,
        imgUrl,
        basedCountry,
        about,
        remainingDays,
        role,
        requests,
        companies
    } = req.body;
    const { id } = req.params;
    try {
        const salt = bcrypt.genSaltSync(bcryptSalt);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const editedUser = await User.findByIdAndUpdate(
            id,
            { $set: { 
                username,
                email,
                password: hashedPassword,
                imgUrl,
                basedCountry,
                about,
                remainingDays,
                role,
                requests,
                companies
            } },
            { new: true }
        );
        res.status(200).json(editedUser);
    } catch (error) {
        next(error);
    }
});

// DELETE user action
router.delete("/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
        await User.findByIdAndDelete(id);
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
