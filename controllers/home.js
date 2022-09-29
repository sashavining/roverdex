module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs", {
      user: req.user,
      page: "index"
    });
  },
  getAbout: (req, res) => {
    res.render("about.ejs", {
      user: req.user,
      page: "about"
    });
  },
};
