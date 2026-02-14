const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const championRoutes = require("./routes/champion");
const guessRoutes = require("./routes/guess");
const signupRoute = require("./routes/signup");
const loginRoute = require("./routes/login");
const profileRoute = require("./routes/profile");
const logoutRoute = require("./routes/logout");
const statsRoute = require("./routes/stats");
const leaderboardRoute = require("./routes/leaderboard");
const yesterdayRoute = require("./routes/yesterday");

const wamRoute = require("./routes/wam");

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5500",
  "http://localhost:5173",
  "https://flindr.netlify.app",
  "https://lolguesser.netlify.app",
  "https://lolgiss.com",
  "https://www.lolgiss.com",
  "https://whackarim.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, origin);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);
app.options("*", cors());

app.use(express.json());
app.use(cookieParser());

app.use("/api/stats", statsRoute);
app.use("/api/champion", championRoutes);
app.use("/api/guess", guessRoutes);
app.use("/api/signup", signupRoute);
app.use("/api/login", loginRoute);
app.use("/api/profile", profileRoute);
app.use("/api/logout", logoutRoute);
app.use("/api/leaderboard", leaderboardRoute);
app.use("/api/yesterday", yesterdayRoute);
app.use("/api/wam", wamRoute);
app.use("/api/flinder", require("./routes/flinder"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
  })
  .finally(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  });
