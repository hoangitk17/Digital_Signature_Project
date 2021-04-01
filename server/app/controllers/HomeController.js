
class HomeController {
    // [GET] /
    index(req, res, next) {
      res.send("Hello Node js");
    }
}

module.exports = new HomeController();
