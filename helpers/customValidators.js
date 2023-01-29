const User = require("../api/users/users.model");

const emailExist = async (email = "") => {
  const user = await User.findOne({ email });
  if (user) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message });
  }
};
module.exports = {
  emailExist,
};
