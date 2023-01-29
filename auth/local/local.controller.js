const User = require("../../api/users/users.model");
const { generarJWT } = require("../../helpers/generateJWT");

const handlerLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      msg: "Usuario no registrado",
    });
  }

  if (await user.comprobarPassword(password)) {
    res.json({
      _id: user._id,
      nombre: user.nombre,
      email: user.email,
      rol: user.rol,
      token: generarJWT(user._id),
    });
  } else {
    return res.status(403).json({
      msg: "Credenciales Incorrectas",
    });
  }
};
module.exports = {
  handlerLogin,
};
