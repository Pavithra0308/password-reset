require("dotenv").config();
console.log("CLIENT_URL from .env:", process.env.CLIENT_URL);
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { User } = require("./UserSchema");
require("./db_config");

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: [process.env.CLIENT_URL, "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Origin",
      req.headers.origin || process.env.CLIENT_URL
    );
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    return res.status(200).end();
  }
  next();
});

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
  tls: { rejectUnauthorized: false },
});

transporter.verify((err) => {
  if (err) console.error("Email transporter error:", err);
  else console.log("Email transporter is ready");
});

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const hash = await bcrypt.hash(password, await bcrypt.genSalt(10));
    const user = new User({ username, email, password: hash });
    await user.save();
    res.status(201).json({ message: "User Registered Successfully" });
  } catch (error) {
    console.error("Registration Error:", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json({ message: "User not found" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(401).json({ message: "Invalid Password" });

    const token = jwt.sign(
      { id: user._id, role: "user" },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login Successful", token });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ message: "Login Failed" });
  }
});

app.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User not found" });

    const rawToken = crypto.randomBytes(32).toString("hex");
    const tokenExpiry = Date.now() + 15 * 60 * 1000;

    user.resetToken = rawToken;
    user.resetTokenExpiry = new Date(tokenExpiry);
    await user.save();

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${rawToken}`;

    await transporter.sendMail({
      from: `"Pavithra" <${process.env.MAIL_USER}>`,
      to: user.email,
      subject: "Reset Your Password",
      html: `
        <h3>Password Reset Request</h3>
        <p>Hello ${user.username},</p>
        <p>Click below to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>This link will expire in 15 minutes.</p>
      `,
    });

    res.status(200).json({ message: "Reset link sent to your email" });
  } catch (err) {
    console.error("Forgot Password Error:", err.message);
    res.status(500).json({ message: "Failed to send reset link" });
  }
});

app.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Token invalid or expired" });
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      await bcrypt.genSalt(10)
    );
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Reset Password Error:", err.message);
    res.status(500).json({ message: "Failed to reset password" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
