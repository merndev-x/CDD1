// server.js
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const app = express();

// 1. Import your db-interaction module
const dbInteraction = require("./node_modules/@blaze-case-ai/blaze-engine/server/database/db-interaction");
// Correctly require the routes from the @blaze-case-ai/blaze-engine package
const caseTypeRoute = require("./node_modules/@blaze-case-ai/blaze-engine/server/route/case-type-route");
const caseRoute = require("./node_modules/@blaze-case-ai/blaze-engine/server/route/case-route");
const componentRoute = require("./node_modules/@blaze-case-ai/blaze-engine/server/route/component-route");

// Serve static files from the "client/public" directory
app.use(express.static(path.join(__dirname, "client/public")));

// Serve node_modules from the root path
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));

// Route for the root of your application
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client/public/index.html"));
});

app.use("/src", express.static(path.join(__dirname, "client/src")));
app.use(express.json());
app.use(caseTypeRoute);
app.use(caseRoute);
app.use(componentRoute);

const PORT = process.env.PORT || 8080;
// 2. Connect to MongoDB using your custom module before starting the server
dbInteraction
  .connect()
  .then(() => {
    console.log("MongoDB connected Successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
