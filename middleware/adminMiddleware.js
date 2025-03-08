function adminMiddleware(req, res, next) {
  if (req.user && req.user.role === "admin") {
      next(); // ✅ Allow admin
  } else {
      return res.status(403).send("Access denied. Only admins can perform this action.");
  }
}

module.exports = adminMiddleware;
