const { Room, Games, Player, Users, UserHistory } = require("../../../models");

const rpsGetWinner = (players) => {
  try {
    let winner = null;
    let draw = false;

    const [p1, p2] = players;

    if (p1.data === p2.data) {
      draw = true;
    } else if (p1.data == "R") {
      p2.data == "P" ? (winner = p2.player_id) : (winner = p1.player_id);
    } else if (p1.data == "P") {
      p2.data == "S" ? (winner = p2.player_id) : (winner = p1.player_id);
    } else if (p1.data == "S") {
      p2.data == "R" ? (winner = p2.player_id) : (winner = p1.player_id);
    }

    return { winner, draw };
  } catch (error) {
    console.error(error);
  }
};

const rpsHandler = async (players, game, userId) => {
  try {
    const { winner, draw } = rpsGetWinner(players);

    const userWinner = await Users.findOne({
      attributes: ["id", "username"],
      where: {
        id: winner,
      },
    });

    return {
      message: "game over",
      result: {
        winner: userWinner,
        draw,
        status:
          winner === userId
            ? "congratulations! you are winner"
            : "you are lose",
        score: winner === userId ? game.win_score : 0,
      },
    };
  } catch (error) {
    console.error(error);
  }
};

const createRoom = async (req, res) => {
  try {
    const rps = await Games.findOne({
      where: {
        name: "rock paper scissors",
      },
    });

    const room = await Room.create({
      game_id: rps.id,
      created_by: req.user.id,
    });

    res.json({
      message: "success create new room",
      result: {
        room_id: room.id,
      },
      error: null,
    });
  } catch (error) {
    console.error(error);
    res.json({
      message: "failed",
      result: null,
      error,
    });
  }
};

const playersFight = async (req, res) => {
  try {
    const roomId = req.params.roomId;
    const data = req.body.data;

    const room = Room.findOne({
      where: {
        id: roomId,
      },
    });

    if (!room) {
      res.json({
        message: "failed",
        result: null,
        error: "room not found",
      });
    }

    const game = await Games.findOne({
      where: {
        name: "rock paper scissors",
      },
    });

    const players = await Player.findAll({
      where: {
        room_id: Number(roomId),
      },
    });

    const rooms = await Room.findOne({
      where: {
        id: Number(roomId),
      },
    });

    if (game.id && players.length === game.max_player) {
      const result = await rpsHandler(players, game, req.user.id);
      const isExistHistory = await UserHistory.findOne({
        where: {
          user_id: result.result.winner.id,
          game_id: game.id,
        },
      });
      if (!isExistHistory && rooms.completed == false) {
        await UserHistory.create({
          user_id: result.result.winner.id,
          game_id: game.id,
          win: 1,
          total_score: game.win_score,
        });
        await Room.update(
          {
            completed: true,
          },
          {
            where: {
              id: Number(roomId),
            },
          }
        );
      } else if (isExistHistory && rooms.completed == false) {
        await UserHistory.update(
          {
            win: isExistHistory.win + 1,
            total_score: (isExistHistory.win + 1) * game.win_score,
          },
          {
            where: {
              user_id: result.result.winner.id,
              game_id: game.id,
            },
          }
        );
        await Room.update(
          {
            completed: true,
          },
          {
            where: {
              id: Number(roomId),
            },
          }
        );
      } else {
        res.json({
          message: "round ended",
        });
        return;
      }
      res.json(result);
      return;
    }

    const isExist = await Player.findOne({
      where: {
        room_id: Number(roomId),
        player_id: req.user.id,
      },
    });

    if (isExist) {
      res.json({
        message: "failed",
        result: null,
        error: "you already played (sent data) in this room",
      });
      return;
    }

    const player = await Player.create({
      room_id: Number(roomId),
      player_id: req.user.id,
      data,
    });

    res.json({
      message: "success fight",
      result: player,
      error: null,
    });
  } catch (error) {
    console.log(error);
    res.json({
      error,
    });
  }
};

module.exports = {
  createRoom,
  playersFight,
};
