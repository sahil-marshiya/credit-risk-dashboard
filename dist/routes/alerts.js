"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/", (req, res) => {
    const { customerId, score } = req.body;
    console.log(`🚨 ALERT: High-risk customer ${customerId} (Score: ${score})`);
    res.status(201).json({ message: "Alert received" });
});
exports.default = router;
