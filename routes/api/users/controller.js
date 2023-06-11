const { Users, UserBiodata, UserHistory, Games, Player } = require("../../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_KEY = process.env.JWT_KEY;

const getPlayers = async (req, res) => {
  try {
    const user = await Users.findAll({
      where: {
        role: "player",
      },
      attributes: ["id", "username", "role"],
      include: [
        {
          model: UserBiodata,
          as: "bio",
        },
        {
          model: UserHistory,
          as: "score",
          include: [
            {
              model: Games,
              as: "games",
            },
          ],
        },
      ],
    });

    if (!user) {
      res.json({
        message: "user not found",
        result: null,
        error: "user not found",
      });
      return;
    }

    res.json({
      message: "success",
      result: user,
      error: null,
    });
  } catch (error) {
    console.error(error);
  }
};

const getPlayerByID = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: {
        id: req.params.id,
        role: "player",
      },
      attributes: ["id", "username", "role"],
    });

    if (!user) {
      res.json({
        message: "user id not found",
        result: null,
        error: "user id not found",
      });
      return;
    }

    res.json({
      message: "success",
      result: user,
      error: null,
    });
  } catch (error) {
    console.error(error);
  }
};

const getLogin = async (req, res) => {
  try {
    const aud = req.header("x-audience");
    const username = req.body.username;
    const password = req.body.password;

    const user = await Users.findOne({
      where: {
        username
      },
    });

    if (!user) {
      res.json({
        message: "failed",
        result: null,
        error: "invalid user/password",
      });
      return;
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      res.json({
        message: "failed",
        result: null,
        error: "invalid user/password",
      });
      return;
    }

    const token = jwt.sign(
      {
        sub: String(user.id),
        iss: "backend",
        aud: aud || "frontend",
      },
      JWT_KEY,
      {
        expiresIn: "1h",
      }
    );

    res.json({
      message: "success",
      result: {
        token,
      },
      error: null,
    });
  } catch (error) {
    console.error(error);
  }
};

const createPlayer = async (req, res) => {
  try {
    const created = await Users.register(req.body);

    const createBio = await UserBiodata.create({
      user_id: created.id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      hobby: req.body.hobby,
    });

    if (!created || !createBio) {
      res.json({
        message: "failed to create a new player",
        result: null,
      });
      return;
    }

    res.json({
      message: "successfully created",
      result: created,
      error: null,
    });
  } catch (error) {
    console.error(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const password = req.body.password;
    const encryptedPassword = bcrypt.hashSync(password, 10);
    const updated = await Users.update(
      {
        username: req.body.username,
        password: encryptedPassword,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (!updated) {
      res.json({
        message: "failed to update",
        result: null,
        error: "failed to update",
      });
      return;
    }

    res.json({
      message: "successfully updated",
      error: null,
    });
  } catch (error) {
    console.error(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    await Player.destroy({
      where: {
        player_id: req.params.id,
      },
    });
    await UserHistory.destroy({
      where: {
        user_id: req.params.id,
      },
    });

    await UserBiodata.destroy({
      where: {
        user_id: req.params.id,
      },
    });

    const deleted = await Users.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deleted) {
      res.json({
        message: "failed to delete",
        result: null,
        error: "failed to delete",
      });
      return;
    }

    res.json({
      message: "successfully deleted",
      error: null,
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getPlayers,
  getPlayerByID,
  getLogin,
  createPlayer,
  updateUser,
  deleteUser,
};
