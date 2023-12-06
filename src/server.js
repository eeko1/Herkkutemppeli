import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import cors from "cors";
import userRoutes from "./routes/user-routes.js";
import productRoutes from "./routes/product-routes.js";

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDirectoryPath = path.join(__dirname, "..", "public");

app.use(express.static(publicDirectoryPath));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, "public")));

app.use("/user", userRoutes);
app.use("/api/products", productRoutes);

// Route to serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(publicDirectoryPath, "index.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
