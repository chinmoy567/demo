// controllers/profileController.js

// GET: Profile page
const getProfile = (req, res) => {
  if (!req.session.isLoggedIn) {
    return res.render("message", {
      title: "Unauthorized Access",
      message: "You must be logged in to view your profile.",
      backLink: "/auth/login",
    });
  }

  const user = req.session.user;

  res.render("user/profile", {
    title: "Your Profile",
    user,
  });
};

module.exports = { getProfile };
