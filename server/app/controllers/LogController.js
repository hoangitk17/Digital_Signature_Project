const Log = require('../models/Log');
const User = require('../models/User');
class LogController {

  // [POST] /log/create
  async create(req, res, next){
    const { userId,
      time,
      action, } = req.body;

    try {
      const oldUser = await User.findOne({ _id: userId });

      if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

      /* const newLog = new Log({
        userId,
        time,
        action,
      }) */

      try {
        const newLog = await Log.create({
            userId,
            time,
            action,
        });
        //await newLog.save();
        res.status(201).json({ data: newLog });
      } catch (error) {
        res.status(409).json({ message: error.message });
      }
    } catch (err) {
      res.status(500).json({ message: "Something went wrong" });
    }
  };

   // [GET] /log/list
   async getLogs(req, res, next) {
    try {
      var logs = [
        {
         userName: "Nguyễn Văn A",
         action: "Nguyễn văn A tạo tài khoản trên hệ thống",
         create_at: "20-05-2021"
       },
       {
         userName: "Nguyễn Văn B",
         action: "Nguyễn Văn B kí văn bản trên hệ thống",
         create_at: "20-05-2021"
       }
     ]

     res.json(logs);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }

}

module.exports = new LogController();
