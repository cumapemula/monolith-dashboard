const usersRouter = require("express").Router();
const { sessionAuthentication } = require("../../../middlewares/authentication");
const {
  getAllUsers,
  getUserCreate,
  getUserById,
  getUserAccountUpdate,
  getUserAccountDelete,
  createUser,
  updateUser,
  deleteUser,
} = require("./usersController");

usersRouter.get("/users", sessionAuthentication, getAllUsers);
usersRouter.get("/users/posts", sessionAuthentication, getUserCreate);
usersRouter.get("/users/:id", sessionAuthentication, getUserById);
usersRouter.get("/users/:id/account", sessionAuthentication, getUserAccountUpdate);
usersRouter.get("/users/:id/delete", sessionAuthentication, getUserAccountDelete);
usersRouter.post("/users/posts", sessionAuthentication, createUser);
usersRouter.post("/users/:id", sessionAuthentication, updateUser);
usersRouter.post("/users/:id/delete", sessionAuthentication, deleteUser);

module.exports = usersRouter;
