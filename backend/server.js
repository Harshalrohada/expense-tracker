require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db.cjs");
const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

// --- START: Updated CORS Configuration ---

// Define the list of allowed frontend URLs
const allowedOrigins = [
  'http://localhost:3000', // Your local frontend for development
  'https://expense-tracker-8fgr.vercel.app' // Your deployed Vercel frontend
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like Postman or mobile apps)
    if (!origin) return callback(null, true);

    // If the request origin is in our whitelist, allow it
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      // Otherwise, block it
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Use the new CORS options
app.use(cors(corsOptions));

// --- END: Updated CORS Configuration ---


app.use(express.json());

connectDB();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use the port provided by Render or default to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));