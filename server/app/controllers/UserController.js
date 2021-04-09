const User = require('../models/User');
const { mongooseToObject } = require('../../utils/mongoose');
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
      gender
    } = req.body;
    try {
      const oldUser = await User.findOne({ userName });

      if (oldUser) return res.status(400).json({ message: "Tài khoản này đã tồn tại" });

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
        gender
      });
      //const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: "1h" });
      //res.status(201).json({ result, token });
      res.status(201).json({ result });
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

    // [GET] /user/:id
    async getListUserById(req, res, next) {
        const { id } = req.params;
        console.log(id)
        try {
            const user = await User.findOne({ _id: id });
            console.log(user)
            const userObj = mongooseToObject(user);
            const userObjTemp = { ...userObj };
            delete userObjTemp.privateKey;
            delete userObjTemp.publicKey;
            delete userObjTemp.password;
            res.json(userObjTemp);
        } catch (error) {
            res.status(500).json({ message: "Something went wrong" });
            console.log(error);
        }
    }

    //[PUT] /user/image-sign/:id
    async updateImageSign(req, res, next) {
        const { id } = req.params;
        const { signImage } = req.body;

        console.log(signImage, req.body)

        try {
            const updatedPost = { signImage, _id: id };

            await User.findByIdAndUpdate({ _id: id }, { $set: updatedPost }, { upsert: true, new: true });

            res.json(updatedPost);
            } catch (error) {
                res.status(500).json({ message: "Something went wrong" });
                console.log(error);
        }
    }
}

module.exports = new UserController();
