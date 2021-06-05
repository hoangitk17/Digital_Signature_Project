const Log = require('../models/Log');
const User = require('../models/User');
const datesAreOnSameDay = (first, second) =>
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate();
class LogController {

    // [POST] /log/create
    async create(req, res, next) {
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
            let { startDate, endDate, fullName } = req.query;
            console.log(startDate, endDate, fullName)
            const logs = await Log.find({});
            const users = await User.find({});
            let newLogs = logs.map(log => {
                let userFind = users.find(user => log.userId + "" === user._id + "")

                if (userFind) {
                    return {
                        userId: log.userId,
                        action: log.action,
                        time: log.time,
                        userName: userFind.userName,
                        name: userFind.name
                    }
                }
            })
            if (startDate) {
                console.log((new Date(startDate)))
                newLogs = newLogs.filter(log => (new Date(startDate)) <= (new Date(log.time)) || datesAreOnSameDay(new Date(startDate), new Date(log.time)));
            }
            console.log(newLogs)
            if (endDate) {
                newLogs = newLogs.filter(log => (new Date(endDate)) >= (new Date(log.time)) || datesAreOnSameDay(new Date(endDate), new Date(log.time)));
            }
            console.log(newLogs)
            if (fullName) {
                newLogs = newLogs.filter(log => log.name.toLowerCase().includes(fullName.toLowerCase()));
            }
            console.log(newLogs)
            res.json(newLogs);
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Something went wrong" });
        }
    }

}

module.exports = new LogController();
