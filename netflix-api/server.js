const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/UserRoutes");
const { connectDatabase, getDbMode } = require("./userStore");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true, storage: getDbMode() });
});

app.use("/api/user", userRoutes);

const start = async () => {
  await connectDatabase();
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`server started on port ${PORT}`);
  });
};

if (require.main === module) {
  start();
}

module.exports = { app, start };
