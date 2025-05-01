"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
const dataPath = path_1.default.join(__dirname, "../data/customers.json");
const getCustomers = () => {
    const data = fs_1.default.readFileSync(dataPath, "utf-8");
    return JSON.parse(data);
};
const saveCustomers = (customers) => {
    fs_1.default.writeFileSync(dataPath, JSON.stringify(customers, null, 2), "utf-8");
};
router.get("/", (req, res) => {
    res.json(getCustomers());
});
router.get("/:id", (req, res) => {
    const customers = getCustomers();
    const customer = customers.find((c) => c.customerId === req.params.id);
    if (customer)
        res.json(customer);
    else
        res.status(404).json({ error: "Customer not found" });
});
router.patch("/:id", (req, res) => {
    const customers = getCustomers();
    const idx = customers.findIndex((c) => c.customerId === req.params.id);
    if (idx === -1)
        return res.status(404).json({ error: "Customer not found" });
    customers[idx] = Object.assign(Object.assign({}, customers[idx]), req.body);
    saveCustomers(customers);
    res.json({ message: "Customer updated", customer: customers[idx] });
});
exports.default = router;
