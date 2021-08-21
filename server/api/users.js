const router = require("express").Router();
const {
  models: { User },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({ include: "friend" });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/login", async (req, res, next) => {
  const userName = req.query.username
  const password = req.query.password

  try {

    let user = await User.findOne({
      where: {
        username: userName,
        password: password,
      }
    })
    if(user) {
      res.json(user)
    }else{
      res.json("invalid login")
    }
   
  } catch (err) {
    next(err);
  }
});



router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await User.create(req.body.formData));
  }catch (error) {
    next(error);
  }
})
