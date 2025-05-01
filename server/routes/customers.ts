import { Router } from "express";
import fs from "fs";
import path from "path";

const router = Router();
const dataPath = path.join(__dirname, "../data/customers.json");

const getCustomers = (): any[] => {
  const data = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(data);
};

const saveCustomers = (customers: any[]) => {
  fs.writeFileSync(dataPath, JSON.stringify(customers, null, 2), "utf-8");
};

router.get("/", (req, res) => {
  res.json(getCustomers());
});

router.get("/:id", (req, res) => {
  const customers = getCustomers();
  const customer = customers.find((c) => c.customerId === req.params.id);
  if (customer) res.json(customer);
  else res.status(404).json({ error: "Customer not found" });
});

router.patch("/:id", (req, res) => {
  const customers = getCustomers();
  const idx = customers.findIndex((c) => c.customerId === req.params.id);

  if (idx === -1) return res.status(404).json({ error: "Customer not found" });

  customers[idx] = { ...customers[idx], ...req.body };
  saveCustomers(customers);

  res.json({ message: "Customer updated", customer: customers[idx] });
});

export default router;
