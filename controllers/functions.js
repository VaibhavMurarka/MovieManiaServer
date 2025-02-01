import User from "../model/User.js";
import Movie from "../model/Movies.js";
import bcryptjs from "bcryptjs";
import sendCookie from "./features.js";

export const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.json({
    success: true,
    users,
  });
};
export const getUserByID = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.json({
    success: true,
    user,
  });
};
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const data = await bcryptjs.hashSync(password, 10);
  var user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    user = await User.create({
      name: name.toLowerCase(),
      email: email.toLowerCase(),
      password: data,
    });
    sendCookie(user, res, "Registered");
  } else {
    res.json({
      success: false,
      message: "Email already registered",
    });
  }
};
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
  // console.log(user);
  if (!user) {
    res.json({
      success: false,
      message: "Wrong email or password",
    });
  } else {
    const data = await bcryptjs.compareSync(password, user.password);
    if (data) {
      sendCookie(user, res, "Logged In");
    } else {
      res.json({
        success: false,
        message: "Wrong email or password",
      });
    }
  }
};
export const getData = (req, res) => {
  return res.status(200).json({
    message: "Welcome user",
    user: req.user,
  });
};

export const fetchWatched = async (req, res) => {
  const data = await Movie.find({
    user: req.user,
    movieType: "watched",
  });
  res.json({
    success: true,
    data,
  });
};
export const fetchWatchlist = async (req, res) => {
  const data = await Movie.find({
    user: req.user,
    movieType: "watchlist",
  });
  res.json({
    success: true,
    data
  });
};
export const postMovie = async (req, res) => {
  const { movie , movieType } = req.body;
  const check = await Movie.findOne({user:req.user,movie});
  if(!check)
  {
    var temp = await Movie.create({user: req.user,movie, movieType });
    res.json({
      success: true,
      temp
    })
  }
  else{
    res.json({
      success: false,
      message: "already exists"
    })
  }
};
export const putMovie = async (req, res) => {
  const { movie, type } = req.body;
  await Movie.updateOne({user: req.user, movie, movieType: type},{
    $set: {movieType: type=='watchlist'?'watched':'watchlist'}
  });
    res.json({
      success: true,
      message: "updated type"
    })
};
export const deleteMovie = async (req, res) => {
  const { movie } = req.body;
  const data = await Movie.findOne({user: req.user, movie});
  await Movie.deleteOne({user: req.user, movie});
    res.json({
      success: true,
      message: "deleted movie"
    })

};

