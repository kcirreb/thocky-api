const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

function token(user) {
  const accessToken = jwt.sign(
    { id: user._id },
    process.env.ACCESS_TOKEN_SECRET
  );
  return {
    email: user.email,
    "Token-Type": "Bearer",
    "Access-Token": accessToken,
  };
}

// create one if not exist
router.post("/", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    res.status(401).json({ error: { message: "Required fields missing." } });
  else {
    const user = await User.findOne({ email: email });
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        res.json(token(user));
      } else {
        res.status(401).json({ error: { message: "Invalid credentials." } });
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const record = new User({
        email: email,
        password: hashedPassword,
        admin: false,
      });
      const user = await record.save();
      res.status(200).json(token(user));
    }
  }
});

module.exports = router;
