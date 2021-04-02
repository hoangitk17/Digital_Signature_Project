const Log = require('../models/Log');
const User = require('../models/User');
class LogController {
  create = async (req, res, next) => {
    const { userId,
      time,
      action, } = req.body;

    try {
      const oldUser = await User.findOne({ userId });

      if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

      const newLog = new Log({
        userId,
        time,
        action,
      })

      try {
        await newLog.save();

        res.status(201).json(newLog);
      } catch (error) {
        res.status(409).json({ message: error.message });
      }
    } catch (err) {
      res.status(500).json({ message: "Something went wrong" });
    }
  };
}

module.exports = new LogController();
