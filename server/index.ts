import express from "express";
import cors from "cors";
import customersRoute from "./routes/customers";
import alertsRoute from "./routes/alerts";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/customers", customersRoute);
app.use("/alerts", alertsRoute);

app.get("/", (req, res) => {
  res.send("📊 Credit Risk Backend Running");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
