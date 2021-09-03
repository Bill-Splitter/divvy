const router = require("express").Router();
const {
  models: { Bill, User },
} = require("../db");

module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const bills = await Bill.findAll({ include: "owes" });
    res.json(bills);
  } catch (err) {
    next(err);
  }
});

router.get("/:userId", async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const bills = await Bill.findAll({
      where: {
        userId: userId,
      },
    });
    const user = await User.findByPk(userId);
    let owes = await user.getOwed();

    res.json(bills.concat(owes));
  } catch (error) {
    next(error);
  }
});

//gets a single bill
router.get("/:billId/pk", async (req, res, next) => {
  const { billId } = req.params;
  try {
    const bill = await Bill.findOne({
      where: {
        id: billId
      },
      attributes: {
        include: ["owes"]
      }
    });
    res.json(bill);
  } catch (error) {
    next(error);
  }
});

//trims the large picture & returns only the parsedBill
router.get("/:billId/parse", async (req, res, next) => {
  const { billId } = req.params;
  try {
    const bill = await Bill.findOne({
      where: {
        id: billId
      },
      attributes: {
        exclude: ['image', 'owes']
      }
    });
    
    res.json(bill.parsedBill);
  } catch (error) {
    next(error);
  }
});

//to update parsedBill in Bill when payee(s) reply
router.put("/:billId/parse", async (req, res, next) => {
  try {
    const { billId } = req.params;
    await Bill.update({
      parsedBill: req.body.parsedBill 
    }, {
      where: {
        id: billId
      },
    });
    
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

//to update completed in Bill when all payees reply
router.put("/:billId/complete", async (req, res, next) => {
  try {
    const { billId } = req.params;
    await Bill.update({
      completed: true 
    }, {
      where: {
        id: billId
      },
    });
    
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const bill = await Bill.create(req.body.bill);
    req.body.friendArray.forEach((element) => {
      bill.addOwes(element.id);
    });
    res.json(bill);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  const billId = req.params.id;
  try {
    await Bill.destroy({
      where: {
        id: billId,
      },
    });
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});
