const mongoose = require("mongoose");

module.exports = mongoose.connect("mongodb://localhost:27017/MongoApi", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
