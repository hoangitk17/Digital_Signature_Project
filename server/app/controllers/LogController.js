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
            const logs = await Log.find({});
            const users = await User.find({});
           let newLogs = logs.map( log => {
               let userFind = users.find(user =>log.userId + "" === user._id + "")

               if(userFind) {
                   return {
                       userId: log.userId,
                       action: log.action,
                       time: log.time,
                       userName: userFind.userName,
                       name: userFind.name
                   }
               }
            })
           /* const newLogs = logs.map(async log =>
               {
                   let user = await User.findOne({ _id: log.userId })
                    return {
                        userId: log.userId,
                        action: log.action,
                        time: log.time,
                        userName: user.userName,
                        name: user.name
                    }}
            ) */
           console.log(newLogs)
           res.json(newLogs);
          /*  Log.find({}, async function (err, logs) {
               var newLogs = await logs.map(async function (log) {
                   let infoUserById = await User.findOne({ _id: log.userId });
                   //console.log(infoUserById)
                   return {
                       userId: log.userId,
                       action: log.action,
                       time: log.time,
                       userName: infoUserById.userName,
                       name: infoUserById.name
                   }
               });
               console.log(newLogs)
               res.json(newLogs);
           }); */
       } catch (error) {
           console.log(error)
           res.status(500).json({ message: "Something went wrong" });
       }
    /* try {
      var logs = [
        {
         name: "Nguyễn Văn A",
         userName: "nguyenvana",
         action: "Nguyễn văn A tạo tài khoản trên hệ thống",
         create_at: "20-05-2021"
       },
        {
         name: "Nguyễn Văn B",
         userName: "nguyenvanb",
         action: "Nguyễn Văn B kí văn bản trên hệ thống",
         create_at: "20-05-2021"
       }
     ]

     res.json(logs);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    } */
  }

}

module.exports = new LogController();
