const router = require("express").Router();
const Sequelize = require("sequelize");

const {
  models: { User },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({ include: ["friend", "requestee"] });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  const userId = req.params.id;

  try {
    const userToUpdate = await User.findOne({
      where: {
        id: userId,
      },
      include: ["friend", "requestee"],
    });
    res.json(await userToUpdate.update(req.body.data));
  } catch (error) {
    res.json("error")
  }
});

router.get("/login", async (req, res, next) => {
  const userName = req.query.username;
  const password = req.query.password;

  try {
    let user = await User.findOne({
      where: {
        username: userName,
        password: password,
      },
      include: ["friend", "requestee"],
    });
    if (user) {
      res.json(user);
    } else {
      res.json("error");
    }
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    let user = await User.create(req.body.formData);
    console.log(user, "is user")
    if(user) {
      let u1 = await User.findByPk(1)
      await user.addRequestee(u1)
      let u2 = await User.findByPk(2)
      await user.addRequestee(u2)
      let u3 = await User.findByPk(3)
      await user.addRequestee(u3)
      let u4 = await User.findByPk(4)
      await user.addRequestee(u4)
      let u5 = await User.findByPk(5)
      await user.addRequestee(u5)
      let u0 = await User.findByPk(0)
      await user.addRequestee(u0)
      let u6 = await User.findByPk(6)
      await user.addRequestee(u6)
      let u7 = await User.findByPk(7)
      await user.addRequestee(u7)
      let u8 = await User.findByPk(8)
      await user.addRequestee(u8)
      let u9 = await User.findByPk(9)
      await user.addRequestee(u9)
      let u10 = await User.findByPk(0)
      await user.addRequestee(u10)
      let u11 = await User.findByPk(11)
      await user.addRequestee(u11)

    }

 


    res.status(201).send()
  } catch (error) {
    console.log("the error is ", error)

    let message = "";
    if (error.errors) message = error.errors[0].message;

    if (message === "Validation isEmail on email failed")
      res.json({ error: "Improper Email Address" });
    else if (message === "username must be unique")
      res.json({ error: "Username already taken" });
    else if (message === "email must be unique")
      res.json({ error: "Email already in use" });
    else res.json({ error: "Invalid Field Entry" });
  }
});

router.delete("/denyRequest/", async (req, res, next) => {
  const sender = req.body.sender;
  const receiver = req.body.receiver;

  try {
    const user = await User.findByPk(sender);
    await user.removeRequestee(receiver);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

router.delete("/deleteFriend/", async (req, res, next) => {
  const u1 = req.body.user1;
  const u2 = req.body.user2;


  try {
    const user1 = await User.findByPk(u1);
    const user2 = await User.findByPk(u2);
    if (user1 && user2) {
      await user1.removeFriend(user2);
      await user2.removeFriend(user1);

      res.json(user2);
    } else next(error);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  const userId = req.params.id;
  try {
    await User.destroy({
      where: {
        id: userId,
      },
    });

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

router.post("/approveRequest", async (req, res, next) => {
  const senderId = req.body.sender;
  const receiverId = req.body.receiver;

  try {
    const user1 = await User.findByPk(senderId);
    const user2 = await User.findByPk(receiverId);
    if (user1 && user2) {
      await user1.addFriend(user2);
      await user2.addFriend(user1);

      await user2.removeRequestee(senderId);
      await user1.removeRequestee(senderId);
      await user2.removeRequestee(receiverId);
      await user1.removeRequestee(receiverId);

      res.json(user2);
    } else next(error);
  } catch (error) {
    next(error);
  }
});

router.post("/addFriend/", async (req, res, next) => {
  const senderId = req.body.senderId;
  const phoneNumber = req.body.phoneNumber;
  const number = Number(phoneNumber);

  try {
    let receiver;
    if (isNaN(number)) {
      receiver = await User.findOne({
        where: {
          [Sequelize.Op.or]: [{ username: phoneNumber }],
        },
      });
    } else {
      receiver = await User.findOne({
        where: {
          [Sequelize.Op.or]: [{ phoneNumber: phoneNumber }],
        },
      });
    }

    if (receiver) {
      await receiver.addRequestee(senderId);
      res.json(receiver);
    } else {
      res.json("user not found");
    }
  } catch (error) {
    next(error);
  }
});
