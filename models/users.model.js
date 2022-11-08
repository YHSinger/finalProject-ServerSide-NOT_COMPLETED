const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/* create user schema */
const usersSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // phone: { type: String },
  /*   recovery: {
    secretKey: { type: String },
    dateRecovery: { type: Date },
  }, */
  isBiz: { type: Boolean, default: false },
  // isSuperAdmin: { type: Boolean, default: false },
});

//create collection
//all the munipulation on the documents will be using this object
const User = mongoose.model("User", usersSchema);

//this function will create new user
const insertUser = (credentails) => {
  const user = new User({
    name: credentails.name,
    email: credentails.email,
    // image: credentails.image ? credentails.image : "http:/imagepath",
    password: credentails.password,
    isBiz: credentails.isBiz,
  });
  return user.save();
};

const updateRecovery = (email, key, date) => {
  return User.updateOne(
    { email },
    { "recovery.secretKey": key, "recovery.dateRecovery": date }
  );
};

const updatePassword = (email, password) => {
  return User.updateOne({ email }, { password, "recovery.secretKey": "" });
};

const selectUserByEmail = (email) => {
  return User.find({ email });
};

module.exports = {
  User,
  insertUser,
  selectUserByEmail,
  updateRecovery,
  updatePassword,
};
