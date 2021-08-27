const router = require("express").Router();
const Sequelize = require("sequelize")

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
      res.json("invalid login");
    }
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const userToUpdate = await User.findByPk(req.params.id);
    res.json(await userToUpdate.update(req.body));
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await User.create(req.body.formData));
  } catch (error) {
    next(error);
  }
});

router.delete("/denyRequest/", async (req, res, next) => {

  const sender = req.body.sender;
  const receiver = req.body.receiver;

  try {
    const user = await User.findByPk(sender);
    user.removeRequestee(receiver);
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
      user1.addFriend(user2);
      user2.addFriend(user1);

      user2.removeRequestee(senderId);
      user1.removeRequestee(senderId);
      user2.removeRequestee(receiverId);
      user1.removeRequestee(receiverId);

      res.json(user2);
    } else next(error);
  } catch (error) {
    next(error);
  }
});

router.post("/addFriend/", async (req, res, next) => {
  const senderId = req.body.senderId;
  const phoneNumber = req.body.phoneNumber;
  const number = Number(phoneNumber)
  

  try {
    let receiver;
    if(isNaN(number)) {
      receiver = await User.findOne({
        where: {
          [Sequelize.Op.or]: [
            {username: phoneNumber}
          ]
        },
      });

    }else{
      receiver = await User.findOne({
        where: {
          [Sequelize.Op.or]: [
            {phoneNumber: phoneNumber},
          ]
        },
      });

    }
   
    if (receiver) {
      receiver.addRequestee(senderId);
      res.json(true)
    } else {
      res.json("not found")
    }
  } catch (error) {
    next(error);
  }

});
