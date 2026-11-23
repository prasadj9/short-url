const express = require("express");
const { handleGenerateShortURL, handleGetAnalytics } = require("../controllers/url");
const Url = require("../models/url");

const router = express.Router();

router.post("/", handleGenerateShortURL);

router.get("/:shortId", async(req, res) => {
    const shortId = req.params.shortId;
    const entry = await Url.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: {
                timestamp: Date.now()
            }
        }
    }, {new: true});

    res.redirect(entry.redirectURL)
});

router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;