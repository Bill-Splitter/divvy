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
    res.json(bills);
  } catch (error) {
    next(error);
  }
});

//not the best way, but it should work until a user makes 2 bills with the same name open at once
router.get("/:userId/:billName", async (req, res, next) => {
  const { userId, billName } = req.params;
  try {
    const bill = await Bill.findOne({
      where: {
        userId: userId,
        name: billName,
        completed: false,
        type: "complex",
      }
    });
    
    res.json(bill);
  } catch (error) {
    next(error);
  }
});

//to update parsedBill in Bill when payee(s) reply
router.put("/:userId/:billName/parse", async (req, res, next) => {
  try {
    const { userId, billName } = req.params;
    await Bill.update({
      parsedBill: req.body.parsedBill 
    }, {
      where: {
        userId: userId,
        name: billName,
        completed: false,
        type: "complex",
      },
    });
    
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

//to update completed in Bill when all payees reply
router.put("/:userId/:billName/complete", async (req, res, next) => {
  try {
    const { userId, billName } = req.params;
    await Bill.update({
      completed: true 
    }, {
      where: {
        userId: userId,
        name: billName,
        completed: false,
        type: "complex",
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
    res.sendStatus(201);
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

/*
router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.delete('/:userId', requireToken, isAdmin, async (req, res, next) => {
  try {
    const userToDelete = await User.findByPk(req.params.userId);
    await userToDelete.destroy();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

router.put('/:userId', requireToken, isAdmin, async (req, res, next) => {
  try {
    let user = await User.findByPk(req.params.userId);
    res.json(await user.update(req.body));
  } catch (error) {
    next(error);
  }
});

router.post('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    res.status(201).send(await User.create(req.body));
  } catch (error) {
    next(error);
  }
});
*/
