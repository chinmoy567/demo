

//core module
const bcrypt = require("bcrypt");
const User = require("../models/userModel");


// GET: Registration page
const getRegister = (req, res) => {
  res.render("auth/register");
};

// POST: Registration
const postRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render("message", {
        title: "User Already Exists",
        message:
          "An account with this email already exists. Please log in instead.",
        backLink: "/auth/login",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.render("message", {
      title: "Registration Successful",
      message:
        "Your account has been created successfully! You can now log in.",
      backLink: "/auth/login",
    });
  } catch (err) {
    console.error(err);
    res.render("message", {
      title: "Server Error",
      message: "An error occurred during registration. Please try again later.",
      backLink: "/auth/register",
    });
  }
};

// GET: Login page
const getLogin = (req, res) => {
  res.render("auth/login");
};

// POST: Login
const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.render("message", {
        title: "User Not Found",
        message:
          "No account exists with this email address. Please register first.",
        backLink: "/auth/register",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render("message", {
        title: "Invalid Password",
        message: "The password you entered is incorrect. Please try again.",
        backLink: "/auth/login",
      });
    }

    // ✅ Create session in MongoDB
    req.session.isLoggedIn = true;
    req.session.user = {
      _id: user._id,
      name: user.name,
      email: user.email,
    };

    res.render("message", {
      title: "Login Successful",
      message: `Welcome back, ${user.name}!`,
      backLink: "/profile",
    });
  } catch (err) {
    console.error(err);
    res.render("message", {
      title: "Server Error",
      message:
        "An error occurred while trying to log you in. Please try again later.",
      backLink: "/auth/login",
    });
  }
};

// GET: Logout
const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.render("message", {
        title: "Logout Error",
        message: "An error occurred while logging out. Please try again.",
        backLink: "/",
      });
    }

    res.render("message", {
      title: "Logged Out",
      message: "You have successfully logged out.",
      backLink: "/",
    });
  });
};

module.exports = { getRegister, postRegister, getLogin, postLogin, logoutUser };
