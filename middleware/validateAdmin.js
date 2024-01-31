export const validateAdmin = async (req, res, next) => {
  if (!req.user.isAdmin) return res.status(403).send("User not admin");

  next();
};
