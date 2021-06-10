const Bill = require('../models/Bill');
class BillController {
  // [POST] /bill/create
  async create(req, res, next) {
    const {
      name,
      email,
      phoneNumber,
      address,
    } = req.body;
    try {
      const newBill = await Bill.create({
        name,
        email,
        phoneNumber,
        address,
      });
      await newBill.save();
      res.status(201).json({ data: newBill });
    } catch (error) {
      res.status(409).json({ message: error?.message || "Something went wrong" });
    }
    /* } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
    } */
  };

  // [GET] /bill/list
  async getBills(req, res, next) {
    try {
      const bills = await Bill.find({});
      res.json(bills);
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Something went wrong" });
    }
  }

}

module.exports = new BillController();
