export const validateUser = (req, res, next) => {
  const { username, email, password } = req.body;

  if (req.path === "/signup") {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
  }

  if (req.path === "/login") {
    console.log("Validating login for email:", email);
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
  }

  next();
};
