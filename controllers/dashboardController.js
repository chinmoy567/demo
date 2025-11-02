// controllers/dashboardController.js
const getDashboardPage = (req, res) => {
  try {
    // ✅ Protect the route
    if (!req.session.isLoggedIn) {
      return res.render("message", {
        title: "Unauthorized Access",
        message: "You must be logged in to view the Dashboard.",
        backLink: "/auth/login",
      });
    }

    // ✅ Render the dashboard view
    res.render("dashboardPage/dashboardPageIndex", {
      title: "Dashboard",
      user: req.session.user,
    });
  } catch (error) {
    console.error("Error loading dashboard:", error);
    res.status(500).render("message", {
      title: "Server Error",
      message: "Something went wrong while loading the dashboard.",
      backLink: "/",
    });
  }
};

module.exports = { getDashboardPage };
