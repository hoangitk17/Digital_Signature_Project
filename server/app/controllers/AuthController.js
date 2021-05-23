const User = require('../models/User');
const jwtHelper = require("../../helpers/jwt.helper");
const { mongooseToObject } = require('../../utils/mongoose');
const { generateRSAKey, encrytAES, decryptRSA } = require('../../utils/nodeforge');
const forge = require('node-forge');
// Biến cục bộ trên server này sẽ lưu trữ tạm danh sách token
// Trong dự án thực tế, nên lưu chỗ khác, có thể lưu vào Redis hoặc DB
let tokenList = {};

// Thời gian sống của token
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "1h";
// Mã secretKey này phải được bảo mật tuyệt đối, các bạn có thể lưu vào biến môi trường hoặc file
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-for-sinature-app@";

// Thời gian sống của refreshToken
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "3650d";
// Mã secretKey này phải được bảo mật tuyệt đối, các bạn có thể lưu vào biến môi trường hoặc file
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "refresh-token-for-sinature-app@";
const keyPair = generateRSAKey();

class AuthController {

  async getPublicKeyRSA(req, res, next) {
    try {
      return res.status(200).json({ publicKey: keyPair.publicKeyPem});
    } catch (err) {
      res.status(500).json({ message: "Something went wrong" });
    }
  };

  async signIn(req, res, next) {
    const { userName, password, key } = req.body;
    try {
      const user = await User.findOne({ userName });

      if (!user) return res.status(404).json({ message: "Tài khoản này không tồn tại!" });

      const isPasswordCorrect = password === user.password;

      if (!isPasswordCorrect) return res.status(400).json({ message: "Mật khẩu không chính xác!" });

      const userObj = user ? await mongooseToObject(user) : {};
      let sentUser = null;
      let { _id, privateKey, publicKey } = userObj;
      if (key) {
        let aesKey = await decryptRSA(key, keyPair.privateKey);
        let encryptedPrivateKey = await encrytAES(privateKey, forge.util.decode64(aesKey));
        sentUser = { _id, privateKey: JSON.stringify(encryptedPrivateKey), publicKey}
      } else {
        res.status(400).json({ message: "Not found key in data" })
      }
      const accessToken = await jwtHelper.generateToken(sentUser, accessTokenSecret, accessTokenLife);
      const refreshToken = await jwtHelper.generateToken(sentUser, refreshTokenSecret, refreshTokenLife);

      // Lưu lại 2 mã access & Refresh token, với key chính là cái refreshToken để đảm bảo unique và không sợ hacker sửa đổi dữ liệu truyền lên
      // lưu ý trong dự án thực tế, nên lưu chỗ khác, có thể lưu vào DB
      tokenList[refreshToken] = { accessToken, refreshToken };

      return res.status(200).json({ accessToken, refreshToken });
    } catch (err) {
      res.status(500).json({ message: "Something went wrong" });
    }
  };

  refreshToken = async (req, res) => {
    // User gửi mã refresh token kèm theo trong body
    const refreshTokenFromClient = req.body.refreshToken;
    // debug("tokenList: ", tokenList);

    // Nếu như tồn tại refreshToken truyền lên và nó cũng nằm trong tokenList của chúng ta
    if (refreshTokenFromClient && (tokenList[refreshTokenFromClient])) {
      try {
        // Verify kiểm tra tính hợp lệ của cái refreshToken và lấy dữ liệu giải mã decoded
        const decoded = await jwtHelper.verifyToken(refreshTokenFromClient, refreshTokenSecret);

        // Thông tin user lúc này các bạn có thể lấy thông qua biến decoded.data
        const userFakeData = decoded.data;

        const accessToken = await jwtHelper.generateToken(userFakeData, accessTokenSecret, accessTokenLife);

        // gửi token mới về cho người dùng
        return res.status(200).json({ accessToken });
      } catch (error) {
        res.status(403).json({
          message: 'Invalid refresh token.',
        });
      }
    } else {
      // Không tìm thấy token trong request
      return res.status(403).send({
        message: 'No token provided.',
      });
    }
  };
}

module.exports = new AuthController();
