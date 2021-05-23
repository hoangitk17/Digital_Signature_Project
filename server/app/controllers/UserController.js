const User = require('../models/User');
const { mongooseToObject } = require('../../utils/mongoose');
const { generateRSAKey4096 } = require('../../utils/hybridcrypto');
const fs = require('fs');
const path = require('path');
class UserController {

  async exists(req, res, next) {
    const { userName } = req.param;

    try {
      const oldUser = await User.findOne({ userName });
      res.status(200).json({ result: oldUser ? true : false });
    } catch (err) {
      res.status(500).json({ message: "Something went wrong" });
    }
  };

  // [POST] /user/create
  async signUp(req, res, next) {
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
      gender,
      imageIdCardFront,
      imageIdCardBack
    } = req.body;
    try {
      const oldUser = await User.findOne({ userName });

      if (oldUser) return res.status(400).json({ message: "Tài khoản này đã tồn tại" });
      let keyPair = null;
      let usableKey = false;
      do {
        keyPair = await generateRSAKey4096();
        let userHasPublic = await User.findOne({ publicKey: keyPair.publicKey });
        let userHasPrivate = await User.findOne({ privateKey: keyPair.privateKey });
        usableKey = (userHasPublic || userHasPrivate);
      } while (usableKey)
      const result = await User.create({
        name,
        email,
        phoneNumber,
        userName,
        password,
        cardId,
        address,
        privateKey: keyPair.privateKey,
        publicKey: keyPair.publicKey,
        signImage,
        avatar,
        dateOfBirth,
        status,
        gender,
        imageIdCardFront,
        imageIdCardBack
      });
      //const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: "1h" });
      //res.status(201).json({ result, token });
      res.status(201).json({ result });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }

  // [GET] /user/list-user
  async getListUser(req, res, next) {
    try {
      /* await User.find({}, (err, users) => res.status(200).json({ users })); */
      User.find({}, function (err, users) {
        // var newUsers = users.map(function (user) {
        //   return {
        //     name: user.name,
        //     email: user.email,
        //     phoneNumber: user.phoneNumber,
        //     userName: user.userName,
        //     password: user.password,
        //     cardId: user.cardId,
        //     dateOfBirth: user.dateOfBirth,
        //     address: user.address,
        //     status: user.statusId,
        //     gender: user.gender,
        //   }
        // });
        var newUsers = [
           {
            name: "Nguyễn Văn A",
            email: "nguyenvana@gmail.com",
            phoneNumber: "0328427348",
            userName: "nguyenvana1928",
            password: "ddjfkfdjkaldfafadffsfsd",
            cardId: "182472432",
            dateOfBirth: "1999-10-09T01:00:04.000Z",
            address: "Hóc Môn, TP Hồ Chí Minh",
            status: 1,
            gender: true,
          },
          {
            name: "Nguyễn Văn B",
            email: "nguyenvanb@gmail.com",
            phoneNumber: "014324348",
            userName: "nguyenvanb1928",
            password: "ddjfkfdjkaldfafadffsfsd",
            cardId: "1343242432",
            dateOfBirth: "1999-10-09T01:00:04.000Z",
            address: "Hóc Môn, TP Hồ Chí Minh",
            status: 2,
            gender: false,
          }
        ]

        res.json(newUsers);
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }

  // [GET] /user/:id
  async getListUserById(req, res, next) {
    const { id } = req.params;
    try {
      const user = await User.findOne({ _id: id });
      const userObj = mongooseToObject(user);
      const userObjTemp = { ...userObj };
      delete userObjTemp.privateKey;
      delete userObjTemp.publicKey;
      //delete userObjTemp.password;
      res.json(userObjTemp);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }

  //[GET] /user/:name
async getImageSign(req, res)
  {
    const fileName = req.params.name;
    if (!fileName) {
        return res.send({
            status: false,
            message: 'no filename specified',
        })
    }
    res.sendFile(path.resolve(`./images/${fileName}`));
  }

  //[PUT] /user/image-sign/:id
  async updateImageSign(req, res, next) {
      const { id } = req.params;
      const { signImage,
          password,
          name,
          email,
          phoneNumber,
          userName,
          cardId,
          address,
          avatar,
          dateOfBirth,
          gender } = req.body;

    let updatedPost = null;

    const processedFile = req.file || {}; // MULTER xử lý và gắn đối tượng FILE vào req
    try {
      if(processedFile && JSON.stringify(processedFile) !== JSON.stringify({}))
      {
          let orgName = processedFile.originalname || ''; // Tên gốc trong máy tính của người upload
          orgName = orgName.trim().replace(/ /g, "-")
          const fullPathInServ = processedFile.path; // Đường dẫn đầy đủ của file vừa đc upload lên server
          // Đổi tên của file vừa upload lên, vì multer đang đặt default ko có đuôi file
          const newFullPath = `${fullPathInServ}-${orgName}`;
          fs.renameSync(fullPathInServ, newFullPath);
          res.send({
              status: true,
              message: 'file uploaded',
              signImage: newFullPath
          })


          updatedPost = { signImage: newFullPath, _id: id };
          await User.findByIdAndUpdate({ _id: id }, { $set: updatedPost }, { upsert: true, new: true });
      }else {
          updatedPost = {
              password,
              name,
              email,
              phoneNumber,
              userName,
              cardId,
              address,
              avatar,
              dateOfBirth,
              gender, _id: id };

          await User.findByIdAndUpdate({ _id: id }, { $set: updatedPost }, { upsert: true, new: true });

          res.json(updatedPost);
      }

    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }

  // [GET] /user/:id
  async getUserInfoByPublicKey(req, res, next) {
    const { publicKey } = req.body;
    try {
      const user = await User.findOne({ publicKey });
      const userObj = await mongooseToObject(user);
      const userObjTemp = { ...userObj };
      delete userObjTemp.privateKey;
      delete userObjTemp.publicKey;
      delete userObjTemp.password;
      //delete userObjTemp.password;
      res.json(userObjTemp);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }

  // [GET] /user/get-link-image-from-file
  async getLinkImageSign(req, res, next) {
      const processedFile = req.file || {}; // MULTER xử lý và gắn đối tượng FILE vào req
      try {
            let orgName = processedFile.originalname || ''; // Tên gốc trong máy tính của người upload
            orgName = orgName.trim().replace(/ /g, "-")
            const fullPathInServ = processedFile.path; // Đường dẫn đầy đủ của file vừa đc upload lên server
            // Đổi tên của file vừa upload lên, vì multer đang đặt default ko có đuôi file
            const newFullPath = `${fullPathInServ}-${orgName}`;
            fs.renameSync(fullPathInServ, newFullPath);
            res.send({
                status: true,
                message: 'file uploaded',
                signImage: newFullPath
            })
      } catch (error) {
          res.status(500).json({ message: "Something went wrong" });
      }
  }
}

module.exports = new UserController();
