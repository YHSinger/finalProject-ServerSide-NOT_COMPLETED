const express = require("express");
const router = express.Router();
const data = require("../../models/users.model");
const Joi = require("joi");

function validateUser(body) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    email: Joi.string().min(6).max(255).required(),
    password: Joi.string().min(6).max(255).required(),
    isBiz: Joi.boolean().required(),
  });
  //validate the body
  return schema.validate(body);
}

// http://localhost:3001/api/users/getuser
router.get("/getuser", (req, res) => {
  let user = {
    name: "kenny",
    lname: "mc",
    age: 8,
  };
  res.json(user);
});
// http://localhost:3001/api/users/getallusers
router.get("/getallusers", (req, res) => {
  res.json(dataArr);
});

let dataArr = [];
// http://localhost:3001/api/users/addnewuser
router.post("/addnewuser", async (req, res) => {
  //1. valudate request body use Joi
  const { error } = validateUser(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  /*   const isUserExist = await data.User.findOne({ email: req.body.email });
  if (isUserExist) {
    return res.status(400).send("Email already exsists");
  } */
  //2. prevent addintail uniuqe key email use if statment

  /* Operation create */

  //new document
  try {
    const user = await data.User.create({
      ...req.body,
      // image: req.body.image ? req.body.image : "http/:path image",
    });
    await user.save();

    res.json({ msg: "ok" });
  } catch (error) {
    res.status(400).send("something went wrong", error);
  }
  // const user = await data.insertUser(req.body);

  //save new document

  //try and catch wrap the create operation return  fulfill or reject
  // need to get answer from server to client side
});

module.exports = router;
