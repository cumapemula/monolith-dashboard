const usersRouter = require("express").Router();
const {
  getAllUsers,
  getUserCreate,
  getUserById,
  getUserAccountUpdate,
  getUserAccountDelete,
  createUser,
  updateUser,
  deleteUser,
} = require("../../controller/usersController");

usersRouter.get("/users", getAllUsers);
usersRouter.get("/users/posts", getUserCreate);
usersRouter.get("/users/:id", getUserById);
usersRouter.get("/users/:id/account", getUserAccountUpdate);
usersRouter.get("/users/:id/delete", getUserAccountDelete);
usersRouter.post("/users/posts", createUser);
usersRouter.post("/users/:id", updateUser);
usersRouter.post("/users/:id/delete", deleteUser);

module.exports = usersRouter;
