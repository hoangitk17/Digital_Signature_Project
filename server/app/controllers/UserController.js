const User = require('../models/User');
const jwt = require('jsonwebtoken');
class UserController {

  async exists (req, res, next) {
    const { userName } = req.param;

    try {
      const oldUser = await User.findOne({ userName });
      res.status(200).json({ result: oldUser ? true: false });
    } catch (err) {
      res.status(500).json({ message: "Something went wrong" });
    }
  };
  async signIn (req, res, next) {
    const { userName, password } = req.body;
      console.log(userName, password, req)
    console.log("sign in")
    try {
      const oldUser = await User.findOne({ userName });

      if (!oldUser) return res.status(404).json({ message: "Tài khoản này không tồn tại!" });

      const isPasswordCorrect = password === oldUser.password;

      if (!isPasswordCorrect) return res.status(400).json({ message: "Mật khẩu không chính xác!" });

      //const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

      //res.status(200).json({ result: oldUser, token });
      res.status(200).json({ result: oldUser });
    } catch (err) {
      res.status(500).json({ message: "Something went wrong" });
    }
  };

  // [POST] /user/create
  async signUp  (req, res, next) {
    const { name,
      email,
      phoneNumber,
      userName,
      password,
      cardId,
      address,
      privateKey,
      publicKey,
      signImage,
      avatar,
      dateOfBirth,
      status,
    } = req.body;
    try {
      const oldUser = await User.findOne({ userName });

      if (oldUser) return res.status(400).json({ message: "User already exists" });

      const result = await User.create({
        name,
        email,
        phoneNumber,
        userName,
        password,
        cardId,
        address,
        privateKey,
        publicKey,
        signImage,
        avatar,
        dateOfBirth,
        status,
      });
      const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: "1h" });
      res.status(201).json({ result, token });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
      console.log(error);
    }
  }

    // [GET] /user/list-user
    async getListUser(req, res, next) {
        try {
            //console.log("abc", req, res, next)
            /* await User.find({}, (err, users) => res.status(200).json({ users })); */
            User.find({} , function (err, users) {
                // var userMap = {};

                // users.forEach(function (user) {
                //     userMap[user._id] = user;
                // });

                res.json(users);
            });
        } catch (error) {
            res.status(500).json({ message: "Something went wrong" });
            console.log(error);
        }
    }
}

module.exports = new UserController();
