const User = require("../api/users/users.model");

const emailExist = async (email = "") => {
  const user = await User.findOne({ email });
  if (user) {
    throw new Error(`the email ${email} is already registered`);
  }
};
module.exports = {
  emailExist,
};
