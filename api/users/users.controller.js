const { getAllUsers, createUser } = require("./users.service");

const handlerCreateUser = async (req, res) => {
  const user = req.body;
  console.log(user);

  try {
    const newUser = await createUser(user);
    console.log(newUser);
    return res.status(200).json(newUser);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const handlerAllUsers = async (req, res) => {
  const { limite = 5, pagina = 1 } = req.query;

  try {
    const users = await getAllUsers(limite, pagina);

    res.json(users);
  } catch (error) {
    res.status(500).json({ msg: "Error obteniendo los usuarios" });
  }
};

module.exports = {
  handlerAllUsers,
  handlerCreateUser,
};
