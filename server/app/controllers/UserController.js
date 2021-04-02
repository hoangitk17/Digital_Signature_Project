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

    try {
      const oldUser = await User.findOne({ userName });

      if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

      const isPasswordCorrect = password === oldUser.password;

      if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

      const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

      res.status(200).json({ result: oldUser, token });
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
}

module.exports = new UserController();
