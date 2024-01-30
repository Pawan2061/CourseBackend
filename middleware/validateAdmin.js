export const validateAdmin = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "Invalid credentials" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("reached here");
    const isAdmin = decoded.isAdmin;

    if (isAdmin) {
      next();
    }

    return res.status(400).json({ message: "The user is not an admin" });
  } catch (error) {
    console.log("hey");
    return res.status(400).json({ message: "Token is invalid" });
  }
};
