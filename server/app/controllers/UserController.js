const User = require('../models/User');
const { mongooseToObject } = require('../../utils/mongoose');
const { generateRSAKey4096 } = require('../../utils/hybridcrypto');
const fs = require('fs');
const path = require('path');
const linkServer = "http://localhost:5000/user/";
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
        var { name,
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
            statusId,
            roleId,
            gender,
            imageIdCardFront,
            imageIdCardBack
        } = req.body;
        try {
            const oldUser = await User.findOne({ userName });
          
            if (oldUser) return res.status(400).json({ message: "Tài khoản này đã tồn tại" });
          console.log("pass");
            let keyPair = null;
            let usableKey = false;
            do {
                keyPair = await generateRSAKey4096();
                let userHasPublic = await User.findOne({ publicKey: keyPair.publicKey });
                let userHasPrivate = await User.findOne({ privateKey: keyPair.privateKey });
                usableKey = (userHasPublic || userHasPrivate);
            } while (usableKey)
            if (imageIdCardFront?.slice(0, 27) === "http://localhost:5000/user/") {
                imageIdCardFront = imageIdCardFront?.slice(27);
            }
            if (imageIdCardBack?.slice(0, 27) === "http://localhost:5000/user/") {
                imageIdCardBack = imageIdCardBack?.slice(27);
            }
            if (avatar?.slice(0, 27) === "http://localhost:5000/user/") {
                avatar = avatar?.slice(27);
            }
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
                statusId,
                roleId,
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
      let { name, gender, status } = req.query;
      status = parseInt(status);
      User.find({}, function (err, users) {
        var newUsers = users.map(function (user) {
          return {
            id: user._id,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            userName: user.userName,
            cardId: user.cardId,
            dateOfBirth: user.dateOfBirth,
            address: user.address,
            statusId: user.statusId,
            gender: user.gender,
            imageIdCardFront: linkServer + user?.imageIdCardFront,
            imageIdCardBack: linkServer + user?.imageIdCardBack, //"http://vyctravel.com/libs/upload/ckfinder/images/Visa/h%E1%BB%99%20chi%E1%BA%BFu/Untitled-7(1).jpg"
            avatar: linkServer + user?.avatar
          }
        });
        if (name) {
          newUsers = newUsers.filter(user => user.name.toLowerCase().includes(name.toLowerCase()));
        }

        if (gender) {
          gender = gender === "true" ? true : false;
          newUsers = newUsers.filter(user => user.gender === gender);
        }
        if (status) {
          newUsers = newUsers.filter(user => user.statusId === status);
        }
        // var newUsers = [
        //   {
        //     id: 1,
        //     name: "Nguyễn Văn A",
        //     email: "nguyenvana@gmail.com",
        //     phoneNumber: "0328427348",
        //     userName: "nguyenvana1928",
        //     password: "ddjfkfdjkaldfafadffsfsd",
        //     cardId: "182472432",
        //     dateOfBirth: "1999-10-09T01:00:04.000Z",
        //     address: "Hóc Môn, TP Hồ Chí Minh",
        //     statusId: 1,
        //     gender: true,

        //   },
        //   {
        //     id: 2,
        //     name: "Nguyễn Văn B",
        //     email: "nguyenvanb@gmail.com",
        //     phoneNumber: "014324348",
        //     userName: "nguyenvanb1928",
        //     password: "ddjfkfdjkaldfafadffsfsd",
        //     cardId: "1343242432",
        //     dateOfBirth: "1999-10-09T01:00:04.000Z",
        //     address: "Hóc Môn, TP Hồ Chí Minh",
        //     statusId: 2,
        //     gender: false,
        //     imageIdCardFront: "https://congdongyoutube.com/wp-content/uploads/2020/09/image-1.png",
        //     imageIdCardBack: "http://vyctravel.com/libs/upload/ckfinder/images/Visa/h%E1%BB%99%20chi%E1%BA%BFu/Untitled-7(1).jpg",
        //     avatar: "https://1.bp.blogspot.com/-O6xJJOTcgMI/XxF9toYJJbI/AAAAAAAAqTU/kDR_SArOGG0srXdhRXjtk3I12wZpjwOTwCLcBGAsYHQ/s1600/anh-dai-dien-gai-dep%2B%25281%2529.jpg"
        //   }
        // ]

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

            user.imageIdCardFront = linkServer + user?.imageIdCardFront,
                user.imageIdCardBack = linkServer + user?.imageIdCardBack,
                user.avatar = linkServer + user?.avatar,
                user.signImage = linkServer + user?.signImage

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
    async getImageSign(req, res) {
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
      console.log(id);
        var { signImage,
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

        if (avatar?.slice(0, 27) === "http://localhost:5000/user/") {
            avatar = avatar?.slice(27);
        }

        let updatedPost = null;

        const processedFile = req.file || {}; // MULTER xử lý và gắn đối tượng FILE vào req
        try {
            if (processedFile && JSON.stringify(processedFile) !== JSON.stringify({})) {
                let orgName = processedFile.originalname || ''; // Tên gốc trong máy tính của người upload
                orgName = orgName.trim().replace(/ /g, "-")
                const fullPathInServ = processedFile.path; // Đường dẫn đầy đủ của file vừa đc upload lên server
                let prefixImage = fullPathInServ?.slice(0, 7);
                let idImage = fullPathInServ?.slice(7);
                // Đổi tên của file vừa upload lên, vì multer đang đặt default ko có đuôi file
                const newFullPath = `${prefixImage}hung-${idImage}-${orgName}`;
                fs.renameSync(fullPathInServ, newFullPath);
                res.send({
                    status: true,
                    message: 'file uploaded',
                    signImage: newFullPath
                })

                if (newFullPath?.slice(0, 27) === "http://localhost:5000/user/") {
                    newFullPath = newFullPath?.slice(27);
                }


                updatedPost = { signImage: newFullPath, _id: id };
                await User.findByIdAndUpdate({ _id: id }, { $set: updatedPost });
            } else {
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
                    gender, _id: id
                };

                await User.findByIdAndUpdate({ _id: id }, { $set: updatedPost });

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
            userObjTemp.imageIdCardFront = linkServer + userObjTemp?.imageIdCardFront,
            userObjTemp.imageIdCardBack = linkServer + userObjTemp?.imageIdCardBack,
            userObjTemp.avatar = linkServer + userObjTemp?.avatar,
            userObjTemp.signImage = linkServer + userObjTemp?.signImage
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
            console.log("1", orgName)
            orgName = orgName.trim().replace(/ /g, "-")
            console.log("2", orgName)
            const fullPathInServ = processedFile.path; // Đường dẫn đầy đủ của file vừa đc upload lên server
            console.log("3", fullPathInServ)
            let prefixImage = fullPathInServ?.slice(0, 7);
            let idImage = fullPathInServ?.slice(7);
            // Đổi tên của file vừa upload lên, vì multer đang đặt default ko có đuôi file
            const newFullPath = `${prefixImage}hung-${idImage}-${orgName}`;
            console.log("4", newFullPath)
            fs.renameSync(fullPathInServ, newFullPath);
            console.log("5", fullPathInServ, newFullPath)
            res.send({
                status: true,
                message: 'file uploaded',
                signImage: newFullPath
            })
        } catch (error) {
            res.status(500).json({ message: "Something went wrong" });
        }
    }

    //[PUT] /user/status
    async updateStatusId(req, res, next) {
        const { user_id, status_id } = req.body;
        try {
            const updatedPost = { statusId: status_id, _id: user_id };
            await User.findByIdAndUpdate({ _id: user_id }, { $set: updatedPost }, { upsert: true, new: true });
            res.json("Cập nhật trạng thái thành công");
        } catch (error) {
            res.status(500).json({ message: "Something went wrong" });
        }
    }
}

module.exports = new UserController();
