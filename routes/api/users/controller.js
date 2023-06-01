const { Users, UserBiodata, UserHistory, Games } = require("../../../models");

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
          as: 'bio',
        },
        {
          model: UserHistory,
          as: 'score',
          include: [
            {
              model: Games,
              as: 'games'
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

const createPlayer = async (req, res) => {
  try {
    const created = await Users.create({
      username: req.body.username,
      password: req.body.password,
      role: "player",
    });

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
      return
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
    const updated = await Users.update(
      {
        username: req.body.username,
        password: req.body.password,
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
  createPlayer,
  updateUser,
  deleteUser
}