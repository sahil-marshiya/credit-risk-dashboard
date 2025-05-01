import { Router } from "express";

const router = Router();

router.post("/", (req, res) => {
  const { customerId, score } = req.body;
  console.log(`🚨 ALERT: High-risk customer ${customerId} (Score: ${score})`);
  res.status(201).json({ message: "Alert received" });
});

export default router;
