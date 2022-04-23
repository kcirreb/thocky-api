const jwt = require("jsonwebtoken");

const User = require("./models/User");

function authUser(req, res, next) {
  const authHeader = req.headers["authorization"];
  const accessToken = authHeader && authHeader.split(" ")[1];
  if (!accessToken)
    return res
      .status(401)
      .json({ error: 401, message: "Bearer token missing." });

  try {
    const user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.user = user;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ error: 401, message: "Invalid bearer token." });
  }
}

async function authRole(req, res, next) {
  const record = await User.findById(req.user.id);
  if (!record.admin)
    return res.status(403).json({ error: 403, message: "Access denied." });
  next();
}

module.exports = { authUser, authRole };
