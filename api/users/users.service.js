const User = require("./users.model");

const createUser = async (user) => {
  return await User.create(user);
};

const getAllUsers = async (limit, page) => {
  const query = {};

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query)
      .limit(Number(limit))
      .skip(limit * (page - 1)),
  ]);
  return {
    totalDocs: total,
    currentPage: Number(page),
    totalPages: Math.ceil(total / limit),
    results: users,
  };
};

module.exports = {
  getAllUsers,
  createUser,
};
